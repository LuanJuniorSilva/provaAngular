import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./app.api";
import { Observable } from "rxjs";

import { map, retry } from "rxjs/operators";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  /*
   *  Metodo para listar tudo
   */

  public list(): Observable<any[]> {
    return this.http.get<any>(URL_API).pipe(
      retry(10),
      map((respota: any) => respota)
    );
  }

  /*
   *  Metodo para excluir
   */
  public deletarItem(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}/${id}`);
  }
}
