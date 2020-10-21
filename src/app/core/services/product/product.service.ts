import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Esta interfaz es unicamente para fines de ejemplo
interface User {
  email: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // products: Product[] = [
  //   {
  //     id: 1,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Tasa',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Camisa',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 3,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Pantalon',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 4,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Broche',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 5,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Zapato',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  // ];
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.ApiUrl}/products/`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.ApiUrl}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.ApiUrl}/products`, product);
  }
  updateProduct(id: string, change: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${environment.ApiUrl}/products/${id}`, change);
  }
  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.ApiUrl}/products/${id}`);
  }

  // Esto es unicamente para fines de ejemplo. Aqui mostramos como castear los datos en type script
  getRandomUsers(): Observable<User[]> {
    return this.http.get('https://randomuser.me/api/?results=10')
    .pipe(
      map((response: any) => response.results as User[])
    );
  }
}

