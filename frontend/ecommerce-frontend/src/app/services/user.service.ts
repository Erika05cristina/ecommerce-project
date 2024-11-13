import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://localhost:3001/auth`;

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Método para hacer registro
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3001/auth/register`, { name, email, password });
  }
  
}
