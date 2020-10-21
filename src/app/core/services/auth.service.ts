import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  // tslint:disable-next-line: typedef
  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loginRestApi(email: string, password: string): Observable<any> {
    return  this.http.post('http://platzi-store.herokuapp.com/auth', {email, password})
    .pipe(
      tap( (data: {token: string}) => {
        const token = data.token;
        this.tokenService.saveToken(token);
      })
    )
  }

  logout(): void{
    this.auth.signOut();
  }

  get authState(): Observable<firebase.User> {
    return this.auth.authState;
  }

}
