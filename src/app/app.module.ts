import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BudgetService } from './services/budget.service';
import { CategoryService } from './services/category.service';
import { IncomeExpenseService } from './services/income_expense.service';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthNGuard } from './guards/authn.guard';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AddEditIncomeComponent } from './add-edit-income/add-edit-income.component';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';
import { BudgetReportListComponent } from './budget-report-list/budget-report-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    LoginComponent,
    UsersComponent,
    AddEditUserComponent,
    AddEditIncomeComponent,
    AddEditExpenseComponent,
    BudgetReportListComponent,
    AddEditCategoryComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    BudgetService,
    CategoryService,
    IncomeExpenseService,
    UserService,
    AuthNGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
