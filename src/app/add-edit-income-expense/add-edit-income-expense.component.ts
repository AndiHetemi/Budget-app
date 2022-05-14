import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from '../models/budget';
import { Category } from '../models/category';
import { Find } from '../models/find';
import { IncomeExpense } from '../models/income_expense';
import { AuthService } from '../services/auth.service';
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../services/category.service';
import { IncomeExpenseService } from '../services/income_expense.service';

@Component({
  selector: 'app-add-edit-income-expense',
  templateUrl: './add-edit-income-expense.component.html',
  styleUrls: ['./add-edit-income-expense.component.css']
})
export class AddEditIncomeExpenseComponent implements OnInit {
  public addEditForm: FormGroup;
  public amount: FormControl;
  public description: FormControl;
  public categoryId: FormControl;
  public submitted: boolean;
  saveError: boolean;
  isEditMode: boolean;
  expIncIdParam: string;
  categories: Category[];
  isExpensePage: boolean;
  catIdNotSelected: boolean;
  currentBudget: Budget;
  currentUserId: number;

  constructor(private _budgetSvc: BudgetService, private _router: Router, private _activatedRoute: ActivatedRoute,  private _incomeExpenseSvc: IncomeExpenseService, private _catSvc: CategoryService, private _authSvc: AuthService) {
    this.amount = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.categoryId = new FormControl(0);
    this.submitted = false;
    this.addEditForm = new FormGroup({
        amount: this.amount,
        description: this.description,
        categoryId: this.categoryId
    });
    this.saveError = false;
    this.isEditMode = false;
    this.expIncIdParam = '';
    this.categories = [];
    this.isExpensePage = false;
    // if url path has expense string then it's expense page
    if (this._router.url.indexOf("expense") != -1) {
      this.isExpensePage = true;
    }
    this.catIdNotSelected = false;
    this.currentBudget = new Budget();
    this.currentUserId = 0;
  }

  get f(): any { return this.addEditForm.controls; }

  ngOnInit(): void {
    this.expIncIdParam = this._activatedRoute.snapshot.params['expIncId']
    if (this.expIncIdParam && this.expIncIdParam !='') {
      this.isEditMode = true;
    }
    if (this.isEditMode) {
      let incomeIdnt = parseInt(this.expIncIdParam);
      let expInc = this._incomeExpenseSvc.findbyId(incomeIdnt);
      if (expInc.id != 0) {
        this.addEditForm.get('amount')?.setValue(expInc.amount);
        this.addEditForm.get('description')?.setValue(expInc.description);
        this.addEditForm.get('categoryId')?.setValue(expInc.categoryId);
      } else {
        this._router.navigate(['/budget-reports']);
      }
    }
    let findCat = new Find();
    findCat.pageSize = 1000;
    this.categories = this._catSvc.find(findCat);
    // Get current budget
    this.currentBudget = this._budgetSvc.find();
    let usr = this._authSvc.userData();
    if (!usr) {
      this._router.navigate(['/budget-reports']);
    }
    this.currentUserId = usr.id;
  }

  onSubmit() {
    this.submitted = true;
    this.saveError = false;

    let incExpReq = new IncomeExpense();
    incExpReq.userId = this.currentUserId;
    incExpReq.amount = parseInt(this.amount.value);
    incExpReq.description = this.description.value;
    incExpReq.categoryId = this.categoryId.value;
    if (incExpReq.categoryId == 0) {
      this.catIdNotSelected = true;
      return;
    }
    incExpReq.type = this.isExpensePage ? 'Expense' : 'Income';
    if (this.isEditMode) {
      incExpReq.id = parseInt(this.expIncIdParam);
      incExpReq.updatedAt = new Date(); 
      console.log(incExpReq.updatedAt)
      let updateResId = this._incomeExpenseSvc.update(incExpReq);
      if (updateResId == 0) {
        this.saveError = true;
        return;
      }
      // update current budget
      this.currentBudget.previousTotal = this.currentBudget.total;
      if (this.isExpensePage) {
        this.currentBudget.total -= incExpReq.amount; 
      } else {
        this.currentBudget.total += incExpReq.amount;
      }
      this._budgetSvc.update(this.currentBudget);
      this._router.navigate(['/budget-reports']);
      return;
    }

    let incExpResId = this._incomeExpenseSvc.add(incExpReq);
    if (incExpResId == 0) {
      this.saveError = true;
      return;
    }
    // update current budget
    this.currentBudget.previousTotal = this.currentBudget.total;
    if (this.isExpensePage) {
      this.currentBudget.total -= incExpReq.amount; 
    } else {
      this.currentBudget.total += incExpReq.amount;
    }
    this._budgetSvc.update(this.currentBudget);
    this._router.navigate(['/budget-reports']);
    return;
  }
}
