import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  errorMessage: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.errorMessage = null; // Clear any previous error
      },
      error: (err) => {
        this.errorMessage = err.message; // Display the error message
        console.error('Error loading customers:', err);
      }
    });
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.loadCustomers(); // Refresh the list
        this.errorMessage = null; // Clear any previous error
      },
      error: (err) => {
        this.errorMessage = err.message; // Display the error message
        console.error('Error deleting customer:', err);
      }
    });
  }
}