import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableListViewComponent } from '@/components/table-list-view/table-list-view.component';
import { TableCardViewComponent } from '@/components/table-card-view/table-card-view.component';
import { AddContactComponent } from '@/components/add-contact/add-contact.component';
import { ContactService } from '@/service/contact.service';
import { AuthService } from '@/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    TableListViewComponent,
    TableCardViewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  view = signal<'list' | 'card'>('card');
  readonly dialog = inject(MatDialog);
  readonly contactService = inject(ContactService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  get currentUser() {
    return this.authService.currentUser();
  }

  openDialog(): void {
    this.dialog.open(AddContactComponent);
  }

  logout(): void {
    this.authService.logout();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 