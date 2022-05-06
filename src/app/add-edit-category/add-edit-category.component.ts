import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  public addEditForm: FormGroup;
  public name: FormControl;
  public submitted: boolean;
  saveError: boolean;
  isEditMode: boolean;
  categoryIdParam: string;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _categorySvc: CategoryService) {
    this.name = new FormControl('', Validators.required);
    this.submitted = false;
    this.addEditForm = new FormGroup({
      name: this.name
    });
    this.saveError = false;
    this.isEditMode = false;
    this.categoryIdParam = '';
  }

  get f(): any { return this.addEditForm.controls;}

  ngOnInit(): void {
    this.categoryIdParam = this._activatedRoute.snapshot.params['catId']
    if (this.categoryIdParam && this.categoryIdParam !='') {
      this.isEditMode = true;
    }
    if (this.isEditMode) {
      let catIdInt = parseInt(this.categoryIdParam);
      let cat = this._categorySvc.findById(catIdInt);
      if (cat.id != 0) {
        this.addEditForm.get('name')?.setValue(cat.name);;
      } else {
        this._router.navigate(['/categories']);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    this.saveError = false;

    let catReq = new Category();
    catReq.name = this.name.value;
    if (this.isEditMode) {
      catReq.id = parseInt(this.categoryIdParam);
      let updateResId = this._categorySvc.update(catReq);
      if (updateResId == 0) {
        this.saveError = true;
        return;
      }
      this._router.navigate(['/categories']);
      return;
    }
    let incExpResId = this._categorySvc.add(catReq);
    if (incExpResId == 0) {
      this.saveError = true;
    }
    this._router.navigate(['/categories']);
    return;
  }

}
