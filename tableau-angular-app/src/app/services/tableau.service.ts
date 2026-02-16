import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableauService {

  private apiUrl = 'http://localhost:8000/api/tableau/token/';

  constructor(private http: HttpClient) {}

  getTableauToken(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
