import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Find } from '../models/find';
import { CategoryService } from '../services/category.service';
import { IncomeExpenseService } from '../services/income_expense.service';

@Component({
  selector: 'app-budget-report-list',
  templateUrl: './budget-report-list.component.html',
  styleUrls: ['./budget-report-list.component.css']
})
export class BudgetReportListComponent implements OnInit {
  incomesExpenses: any[];


  constructor(private _incExpSvc: IncomeExpenseService, private _catSvc: CategoryService, private _router: Router) {
    this.incomesExpenses = [];
  }

  loadData() {
    let incExps = this._incExpSvc.find(new Find());
    for (let incExp of incExps) {
      let catName = this._catSvc.findById(incExp.categoryId).name;
      let inObj = {
        ...incExp,
        categoryName: catName
      };
      this.incomesExpenses.push(inObj);
    }
  }

  ngOnInit(): void {
  }

  goToAddIncomePage() {
    this._router.navigate(['budget-reports/add-income']);
  }

  goToAddExpensePage() {
    this._router.navigate(['budget-reports/add-expense']);
  }

  goToEditPage(incExp: number) {
  }

  removeIncExp(incExp: number) {
  }
}
