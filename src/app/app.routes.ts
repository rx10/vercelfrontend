import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/add', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];