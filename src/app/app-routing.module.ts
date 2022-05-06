import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddEditIncomeExpenseComponent } from './add-edit-income-expense/add-edit-income-expense.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AppComponent } from './app.component';
import { BudgetReportListComponent } from './budget-report-list/budget-report-list.component';
import { BudgetComponent } from './budget/budget.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthNGuard } from './guards/authn.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './main-layout/layout/layout.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {  path: 'home', component: HomeComponent },
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
        component: AddEditIncomeExpenseComponent,
        canActivate: [AuthNGuard] 
      },
      { 
        path: 'budget-reports/add-income', 
        component: AddEditIncomeExpenseComponent,
        canActivate: [AuthNGuard] 
      },
      { 
        path: `budget-reports/edit/income/:expIncId`, 
        component: AddEditIncomeExpenseComponent,
        canActivate: [AuthNGuard] 
      },
      { 
        path: `budget-reports/edit/expense/:expIncId`, 
        component: AddEditIncomeExpenseComponent,
        canActivate: [AuthNGuard] 
      },
      {
        path: `categories`, 
        component: CategoryListComponent,
        canActivate: [AuthNGuard] 
      },
      {
        path: `categories/add`, 
        component: AddEditCategoryComponent,
        canActivate: [AuthNGuard] 
      },
      {
        path: `categories/edit/:catId`, 
        component: AddEditCategoryComponent,
        canActivate: [AuthNGuard] 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
