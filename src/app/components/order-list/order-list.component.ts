import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, RouterModule], // Add RouterModule and CommonModule
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.errorMessage = null; // Clear any previous error
      },
      error: (err) => {
        this.errorMessage = err.message; // Display the error message
        console.error('Error loading orders:', err);
      }
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.loadOrders(); // Refresh the list
        this.errorMessage = null; // Clear any previous error
      },
      error: (err) => {
        this.errorMessage = err.message; // Display the error message
        console.error('Error deleting order:', err);
      }
    });
  }
}