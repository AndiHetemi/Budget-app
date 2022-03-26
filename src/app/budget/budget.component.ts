import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  public budgetForm: FormGroup;
  public totalBudget: FormControl;
  submitted: boolean;
  previousTotal: number;
  
  constructor(private _router: Router, private _budgetSvc: BudgetService) {
    this.totalBudget = new FormControl(0, Validators.required);
    this.budgetForm = new FormGroup({
      totalBudget: this.totalBudget
    });
    this.submitted = false;
    this.previousTotal = 0;
  }
   
  get f(): any { return this.budgetForm.controls; }

  ngOnInit(): void {
    // call find func from budget svc and set it on totalBudget value
    let currentBudget = this._budgetSvc.find();
    if (currentBudget) {
      this.budgetForm.get('totalBudget')?.setValue(currentBudget.total);
      this.previousTotal = currentBudget.previousTotal;
    }
  }

  onSubmit() {
    this.submitted = true;
    let budgetReq = new Budget();
    budgetReq.total = parseInt(this.totalBudget.value);
    // call add function
    this._budgetSvc.add(budgetReq);
  }
}
