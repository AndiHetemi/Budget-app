import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { IncomeExpenseService } from '../services/income_expense.service';

@Component({
  selector: 'app-add-edit-income',
  templateUrl: './add-edit-income.component.html',
  styleUrls: ['./add-edit-income.component.css']
})
export class AddEditIncomeComponent implements OnInit {
  public addEditForm: FormGroup;
  public amount: FormControl;
  public description: FormControl;
  public categoryId: FormControl;
  public submitted: boolean;
  sameAmountError: boolean;
  saveSuccess: boolean;
  isEditMode: boolean;
  incomeIdParam: string;
  categories: Category[];

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,  private _incomeSvc: IncomeExpenseService, private _catSvc: CategoryService) {
    this.amount = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.categoryId = new FormControl(0);
    this.submitted = false;
    this.addEditForm = new FormGroup({
        amount: this.amount,
        description: this.description,
        categoryId: this.categoryId
    });
    this.sameAmountError = false;
    this.saveSuccess = false;
    this.isEditMode = false;
    this.incomeIdParam = '';
    this.categories = [];
  }

  get f(): any { return this.addEditForm.controls; }

  ngOnInit(): void {
    this.incomeIdParam = this._activatedRoute.snapshot.params['incomeId']
    if (this.incomeIdParam && this.incomeIdParam !='') {
      this.isEditMode = true;
    }
    if (this.isEditMode) {
      let incomeIdnt = parseInt(this.incomeIdParam);
      let user = this._incomeSvc.findbyId(incomeIdnt);
      if (user.id != 0) {
        this.addEditForm.get('amount')?.setValue(user.amount);
        this.addEditForm.get('description')?.setValue(user.description);
      } else {
        this._router.navigate(['/users']);
      }
    }

    this.categories = this._catSvc.find();
  }

  onSubmit() {
    console.log('catid', this.categoryId.value);
    this.submitted = true;
    this.sameAmountError = false;
    this.saveSuccess = false;
    if (!this.isEditMode) {
    }
  }

}
