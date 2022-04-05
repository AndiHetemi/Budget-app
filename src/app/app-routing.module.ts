import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';
import { AddEditIncomeComponent } from './add-edit-income/add-edit-income.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AppComponent } from './app.component';
import { BudgetReportListComponent } from './budget-report-list/budget-report-list.component';
import { BudgetComponent } from './budget/budget.component';
import { AuthNGuard } from './guards/authn.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthNGuard],
  },
  { 
    path: 'budget', 
    component: BudgetComponent,
    canActivate: [AuthNGuard] 
  },
  { 
    path: 'users', 
    component: UsersComponent,
    canActivate: [AuthNGuard] 
  },
  { 
    path: 'users/add', 
    component: AddEditUserComponent,
    canActivate: [AuthNGuard] 
  },
  {
    path: 'users/edit/:userId', 
    component: AddEditUserComponent,
    canActivate: [AuthNGuard] 
  },
  { 
    path: 'budget-reports', 
    component: BudgetReportListComponent,
    canActivate: [AuthNGuard] 
  },
  { 
    path: 'budget-reports/add-expense', 
    component: AddEditExpenseComponent,
    canActivate: [AuthNGuard] 
  },
  { 
    path: 'budget-reports/add-income', 
    component: AddEditIncomeComponent,
    canActivate: [AuthNGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
