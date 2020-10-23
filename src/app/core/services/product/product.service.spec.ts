import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { Product } from '@core/models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe: lo que hace es agrupar pruebas.
  describe('test for getAllProducts', () => {
    // it: es nuestra prueba como tal.
    it('should return Product[]', () => {
      // arrange
      // Este es el formato de datos que se espera recibir.
      const expectData = [
        {
          id: '1',
          image: 'img/img.jpg',
          title: 'dass',
          price: 1232,
          description: 'asdas',
        },
        {
          id: '2',
          image: 'img/img.jpg',
          title: 'dass',
          price: 1232,
          description: 'asdas',
        }
      ];
      // Creamos dos variables que es la de error y la de respuesta.
      let dataError: any;
      let dataResponse: Product[];

      // act
      // En esta parte especificamos que es lo que debe hacer. Es como si utilizaramos el servicio.
      service.getAllProducts()
        .subscribe(
          response => dataResponse = response,
          error => dataError = error
        );
      // Aqui le indicamos que tipo de solicitud estamos esperando. Basicamente seria la  url del servicio.
      const request = httpTestingController.expectOne(`${environment.ApiUrl}/products/`);
      // aqui especificamo en que formato deberia de ser la respuesta de esa solicitud.
      request.flush(expectData);

      // assert
      // Estas son las condicines que se deben cumplir para que esta prueba sea exitosa.
      expect(dataResponse.length).toEqual(2); // aqui esperamos que devuelva un arreglo de por lo menos 2 elementos.
      expect(request.request.method).toEqual('GET'); // aqui esperamos que sea una peticion GET.
      expect(dataError).toBeUndefined(); // Aqui esperamos que no devuelva ningun error.
    });

  });

});
