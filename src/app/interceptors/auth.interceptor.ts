import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  if (usuarioService.isLogged()) {


    const token = usuarioService.getToken();
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', token ? token : ''),
    });


    return next(reqWithHeader).pipe(
      catchError((error) => {
        if (error.status === 401) {
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );

  }

  else {
    return next(req);
  }


};

