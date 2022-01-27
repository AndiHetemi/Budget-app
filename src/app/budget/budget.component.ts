import { Component, OnInit } from '@angular/core';
import { BudgetRequest } from '../models/budget_request';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  public budgetReq: BudgetRequest;

  constructor() {
    this.budgetReq = new BudgetRequest();
    this.budgetReq.total = 1000; 
    console.log(this.budgetReq);
  }
   

  ngOnInit(): void {
  }

}
