import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products: any[] = [];  // Variable para almacenar los productos
  newProduct = { name: '', price: 0, description: '' };  // Nuevo producto a agregar

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();  // Cargar los productos al iniciar el componente
  }

  // Método para cargar todos los productos desde el backend
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.description) {
      this.productService.addProduct(this.newProduct).subscribe(
        (response) => {
          console.log('Producto agregado:', response);
          this.loadProducts();  // Recargar los productos después de agregar uno nuevo
          this.newProduct = { name: '', price: 0, description: '' };  // Limpiar el formulario
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
        }
      );
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Método para eliminar un producto
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Producto eliminado:', response);
        this.loadProducts();  // Recargar los productos después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}

