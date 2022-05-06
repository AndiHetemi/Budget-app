import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { ICategoryAPIService } from "./category.api";

@Injectable({
    providedIn: 'root'
})
export class CategoryService implements ICategoryAPIService {
    localStorage: any;
    catKey: string; 

    constructor() {
        this.localStorage = window.localStorage;
        this.catKey = 'categories';
    }

    add(req: Category): number {
        const cts: string = this.localStorage.getItem(this.catKey);
        let ctsArray: Category[] = [];
        if (cts && cts != '') {
            ctsArray = JSON.parse(cts);
            const lastCat: Category = ctsArray[ctsArray.length - 1];
            if (ctsArray.length != 0) {
                req.id = lastCat.id+1;
            } else {
                req.id = 1;
            }
        } else {
            req.id = 1;
        }
        ctsArray.push(req);
        this.localStorage.setItem(this.catKey, JSON.stringify(ctsArray));
        return req.id;
    }   

    find(): Category[] {
        const ctsStr = this.localStorage.getItem(this.catKey);
        const ctsArray: Category[] = JSON.parse(ctsStr);
        return ctsArray;
    }

    findById(reqId: number): Category { 
        const cts = this.localStorage.getItem(this.catKey);
        const ctsArray: Category[] = JSON.parse(cts);
        if (ctsArray) {
            for (let ct of ctsArray) {
                // if id of category(ct) equals with req id, return ct
                if (ct.id == reqId) {
                    return ct;
                }
            }
        }
        return new Category();
    }
    
    update(req: Category): number {
        const cts = this.localStorage.getItem(this.catKey);
        const ctsArray: Category[] = JSON.parse(cts);
        if (ctsArray) {
            for (let ct of ctsArray) {
                // if id of category(ct) equals with req id
                // update cat in array and setitem in localstorage
                if (ct.id == req.id) {
                    ct.name = req.name;
                    this.localStorage.setItem(this.catKey, JSON.stringify(ctsArray));
                    return req.id;
                }
            }
        } 
        return 0;
    }

    remove(reqId: number): number {
        const cts = this.localStorage.getItem(this.catKey);
        let ctsArray: Category[] = JSON.parse(cts);
        if (ctsArray) {
            let catIndex = ctsArray.findIndex(cat => cat.id === reqId);
            if (catIndex > -1) {
                ctsArray.splice(catIndex, 1);
                this.localStorage.setItem(this.catKey, JSON.stringify(ctsArray));
                return reqId;   
            }
        }   
        return 0;
    }

}