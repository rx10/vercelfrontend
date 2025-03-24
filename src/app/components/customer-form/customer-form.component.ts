import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  errorMessage: string | null = null; // Add error message property

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.customerService.getCustomer(+id).subscribe({
        next: (customer) => this.customerForm.patchValue(customer),
        error: (err) => {
          this.errorMessage = err.message; // Display error message
          console.error('Error loading customer:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    const customer = this.customerForm.value;
    const operation = this.isEditMode
      ? this.customerService.updateCustomer(customer.id, customer)
      : this.customerService.createCustomer(customer);

    operation.subscribe({
      next: () => this.router.navigate(['/customers']),
      error: (err) => {
        this.errorMessage = err.message; // Display error message
        console.error('Error saving customer:', err);
      }
    });
  }
}