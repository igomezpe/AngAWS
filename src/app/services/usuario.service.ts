import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.API_BASE_URL;

  
   router = inject(Router);

  constructor(private http: HttpClient) {

  }


  getLogin(usuarioRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + "/usuarios/login", usuarioRequest).pipe(
      map(data => {
        if (data) {
          return data;
        } else {
          throw new Error('Received null response');
        }
      })
    );
  }


  logOut() {

    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  isLogged() {
    const token = localStorage.getItem("token");

    if (token) {

      return true;

    } else {
      return false;
    }

  }

  getToken() {
    const token = localStorage.getItem("token");
    return token;

  }

}
