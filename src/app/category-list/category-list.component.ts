import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Find } from '../models/find';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  selectedDeleteCategoriesId: number;
  findCat: Find;
  totalLength: number;


  constructor(private _router: Router, private _categoriesSvc: CategoryService) {
    this.categories = [];
    this.selectedDeleteCategoriesId = 0;
    this.findCat = new Find();
    this.totalLength = 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categories = this._categoriesSvc.find(this.findCat);
    this.loadDataCount();
  }

  loadDataCount() {
    this.totalLength = this._categoriesSvc.count();
  }

  setSelectedCategoryId(catId: number) {
    this.selectedDeleteCategoriesId = catId;
  } 

  removeCategory() {
    if (this.selectedDeleteCategoriesId == 0) {
      return;
    }
    let resId = this._categoriesSvc.remove(this.selectedDeleteCategoriesId);
    if (resId != 0) {
      this.loadData();
      let modalDeleteCloseBtn = <HTMLButtonElement>document.getElementById("closeModalButton");
      if (modalDeleteCloseBtn) {
        modalDeleteCloseBtn.click();
      }
    }
  }

  goToAddCategoryPage() {
    this._router.navigate(['/categories/add']);
  }

  goToEditPage(catId: number) {
    this._router.navigate([`/categories/edit/${catId}`]);
  }

  pageChange(page: number) {
    this.findCat.page = page;
    this.loadData();
  }
}
