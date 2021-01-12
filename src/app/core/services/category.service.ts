import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Category  } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Category[]>(`${environment.ApiUrl2}/categories/`);
  }

  get(id: string){
    return this.http.get<Category>(`${environment.ApiUrl2}/categories/${id}`);
  }

  create(category: Partial<Category>){
    return this.http.post<Category>(`${environment.ApiUrl2}/categories/`,category);
  }

  update(id: string, category: Partial<Category>){
    return this.http.put<Category>(`${environment.ApiUrl2}/categories/${id}`,category);
  }

  checkName(name: string){
    return this.http.post(`${environment.ApiUrl2}/categories/availability`, {name});
  }
}
