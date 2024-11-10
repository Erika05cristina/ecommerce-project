import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:3002/products';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Agregar un nuevo producto
  addProduct(product: { name: string, price: number, description: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, product);
  }

  // Modificar un producto existente
  updateProduct(id: number, product: { name: string, price: number, description: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
