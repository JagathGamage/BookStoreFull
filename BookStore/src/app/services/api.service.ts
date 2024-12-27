import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  deleteData(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5000/api'; // ASP.NET API URL

  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
    
  }

  addBook( payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, payload);
  }
  getBookById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/books/${id}`);
  }
  
  updateBook(id: string, book: any) {
    return this.http.put<any>(`${this.baseUrl}/books/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${id}`);
  }
 
}
