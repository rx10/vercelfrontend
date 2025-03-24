import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isEditMode = false;
  errorMessage: string | null = null; // Define the errorMessage property

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      id: [0],
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      customerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.orderService.getOrder(+id).subscribe({
        next: (order) => this.orderForm.patchValue(order),
        error: (err) => {
          this.errorMessage = err.message; // Set the error message
          console.error('Error loading order:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    const order = this.orderForm.value;
    const operation = this.isEditMode
      ? this.orderService.updateOrder(order.id, order)
      : this.orderService.createOrder(order);

    operation.subscribe({
      next: () => this.router.navigate(['/orders']),
      error: (err) => {
        this.errorMessage = err.message; // Set the error message
        console.error('Error saving order:', err);
      }
    });
  }
}