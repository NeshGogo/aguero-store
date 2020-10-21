import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import * as Sentry from '@sentry/angular';

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
    return this.http.get<Product[]>(`${environment.ApiUrl}/products/`)
    .pipe(
      catchError(this.handlerError ),
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.ApiUrl}/products/${id}`)
    .pipe(
      catchError(this.handlerError ),
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.ApiUrl}/products`, product)
    .pipe(
      catchError(this.handlerError ),
    );
  }
  updateProduct(id: string, change: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${environment.ApiUrl}/products/${id}`, change)
    .pipe(
      catchError(this.handlerError ),
    );
  }
  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.ApiUrl}/products/${id}`)
    .pipe(
      catchError(this.handlerError ),
    );
  }

  // Esto es unicamente para fines de ejemplo. Aqui mostramos como castear los datos en type script
  getRandomUsers(): Observable<User[]> {
    // Estamos probocando un error al agregarle una r de mas en la API.
    return this.http.get('https://randomuserr.me/api/?results=10')
    .pipe(
      // El retry nos ayuda a repetir la peticion n veces, este solo se ejecuta si falla.
      retry(3),
      catchError(this.handlerError ),
      map((response: any) => response.results as User[])
    );
  }

  getFile(): Observable<string> {
    return this.http.get('assets/files/test.txt', {responseType: 'text'});
  }

  private handlerError( err: HttpErrorResponse): Observable<never>{
    // Este es el error detallado que es para nosotros. Este detalle de error lo podemos mandar para un log de errores.
    console.error(err);
    Sentry.captureException(err);
    // Este es el error que es para mostrarselo al usuario.
    return throwError('Ups!! Algo salio mal al procesar la accion');
  }
}

