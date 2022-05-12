import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Budget } from '../models/budget';
import { Find } from '../models/find';
import { FindIncomeExpense } from '../models/find_income_expense';
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../services/category.service';
import { IncomeExpenseService } from '../services/income_expense.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-budget-report-list',
  templateUrl: './budget-report-list.component.html',
  styleUrls: ['./budget-report-list.component.css']
})
export class BudgetReportListComponent implements OnInit {
  incomesExpenses: any[];
  selectedIncExpIdToDelete: number;
  selectedIncExpTypeToDelete: string;
  currentBudget: Budget;
  selectedIncExpAmountToDelete: number;
  filterTypeValue: string;
  fromDate: any;
  toDate: any;
  findIncomeExpenses: FindIncomeExpense;
  totalLength: number;

  constructor(private _budgetSvc: BudgetService, private _incExpSvc: IncomeExpenseService, private _catSvc: CategoryService, private _router: Router, private _userSvc: UserService) {
    this.incomesExpenses = [];
    this.selectedIncExpIdToDelete = 0;
    this.selectedIncExpTypeToDelete = '';
    this.currentBudget = new Budget;
    this.selectedIncExpAmountToDelete = 0;
    this.filterTypeValue = '';
    this.findIncomeExpenses = new FindIncomeExpense();
    this.totalLength = 0;
  }

  loadData(find: FindIncomeExpense) {
    this.incomesExpenses = [];
    let incExps = this._incExpSvc.find(find);
    for (let incExp of incExps) {
      let catName = this._catSvc.findById(incExp.categoryId).name;
      let inObj = {
        ...incExp,
        categoryName: catName,
        userFullName: this.userFullName(incExp.userId)
      };
      this.incomesExpenses.push(inObj);
    }
    this.loadDataCount();
  }

  loadDataCount() {
    this.totalLength = this._incExpSvc.count();
  }

  userFullName(userId: number): string {
    let us = this._userSvc.findbyId(userId);
    if (!us) {
      return '';
    }
    return us.firstName + ' ' + us.lastName;
  }

  ngOnInit(): void {
    let find = new FindIncomeExpense();
    this.loadData(find);
    this.currentBudget = this._budgetSvc.find();
  }

  goToAddIncomePage() {
    this._router.navigate(['budget-reports/add-income']);
  }

  goToAddExpensePage() {
    this._router.navigate(['budget-reports/add-expense']);
  }

  goToEditPage(incExpId: number, type: string) {
    if (type == 'Income') {
     this._router.navigate([`budget-reports/edit/income/${incExpId}`]);
    } else {
      this._router.navigate([`budget-reports/edit/expense/${incExpId}`]);
    }
  }

  prepareRemoveIncExp(incExpId: number, type: string, amount: number) {
    this.selectedIncExpIdToDelete = incExpId;
    this.selectedIncExpTypeToDelete = type;
    this.selectedIncExpAmountToDelete = amount;
  }

  removeExpenseIncome() {
    if (this.selectedIncExpIdToDelete == 0 || this.selectedIncExpTypeToDelete == '') {
      return
    }
    let resId = this._incExpSvc.remove(this.selectedIncExpIdToDelete);
    if (resId != 0) {
      this.loadData(this.findIncomeExpenses);
      // update current budget
      this.currentBudget.previousTotal = this.currentBudget.total;
      if (this.selectedIncExpTypeToDelete == 'Income') {
        this.currentBudget.total -= this.selectedIncExpAmountToDelete; 
      } else {
        this.currentBudget.total += this.selectedIncExpAmountToDelete;
      }
      this._budgetSvc.update(this.currentBudget);
      let modalDeleteCloseBtn = <HTMLButtonElement>document.getElementById("closeModalButton");
      if (modalDeleteCloseBtn) {
        modalDeleteCloseBtn.click();
      }
      return;
    }
  }

  onFilterTypeSelect() { 
    this.findIncomeExpenses.type = this.filterTypeValue;
    this.loadData(this.findIncomeExpenses);
  }

  pageChange(page: number) {
    this.findIncomeExpenses.page = page;
    this.loadData(this.findIncomeExpenses);
  }
}
