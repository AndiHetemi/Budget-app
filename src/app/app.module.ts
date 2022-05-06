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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthNGuard } from './guards/authn.guard';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AddEditIncomeExpenseComponent } from './add-edit-income-expense/add-edit-income-expense.component';
import { BudgetReportListComponent } from './budget-report-list/budget-report-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { LayoutComponent } from './main-layout/layout/layout.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    LoginComponent,
    UsersComponent,
    AddEditUserComponent,
    AddEditIncomeExpenseComponent,
    BudgetReportListComponent,
    AddEditCategoryComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule 
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
