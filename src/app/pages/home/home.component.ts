import { CommonModule } from '@angular/common';
import { Component, inject, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TableListViewComponent } from '@/components/table-list-view/table-list-view.component';
import { TableCardViewComponent } from '@/components/table-card-view/table-card-view.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '@/components/add-contact/add-contact.component';
import { ContactService } from '@/service/contact.service';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    TableListViewComponent,
    TableCardViewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  modalState = 'close'
  view = signal<'list' | 'card'>('card');
  readonly dialog = inject(MatDialog);
  contactService = inject(ContactService);



  openDialog(): void {
    this.dialog.open(AddContactComponent)
  }
}
