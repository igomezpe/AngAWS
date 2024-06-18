import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }


  getAllProducts():Observable<Producto[]>{

    return this.http.get<Producto[]>(this.url + "/productos").pipe(
      map(data => {
        if (data) {
          return data;
        } else {
          throw new Error('Received null response');
        }
      })
    );

  }

}
