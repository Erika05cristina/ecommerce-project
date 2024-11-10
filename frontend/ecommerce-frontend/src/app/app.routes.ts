import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login al inicio
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },  // Asegúrate de tener la ruta para productos
    { path: '**', redirectTo: '/login' } 
];
