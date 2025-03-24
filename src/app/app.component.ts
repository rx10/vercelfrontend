import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav>
      <a routerLink="/customers" routerLinkActive="active">Customers</a>
      <a routerLink="/orders" routerLinkActive="active">Orders</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { padding: 1rem; background: #f0f0f0; }
    a { margin-right: 1rem; text-decoration: none; color: #333; }
    a.active { font-weight: bold; color: #0066cc; }
  `]
})
export class AppComponent {}