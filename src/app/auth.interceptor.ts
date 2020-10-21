import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) { }
  // Aqui estamos interceptando la peticion http.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  // Esta funcion le agrega el token a lo solictudes http
  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken(); // Obtenemos el token
    console.log(token);
    // esta en true para fines de prueba
    if (token){
      // Clonamos el reuest pero agregandole un atributo al header de la request que es el token.
      request = request.clone({
        setHeaders: {
          token,
        }
      });
      return request;
    }
    // Aqui podriamos manipularlo segun nuestra necesidad. Ej: generar error, levantar alerta, etc. En este caso solo no lo modificamos.
    return request;
  }
}
