import { ReactiveFormComponent } from '@/components/reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableListViewComponent } from '@/components/table-list-view/table-list-view.component';
import { TableCardViewComponent } from '@/components/table-card-view/table-card-view.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    TableListViewComponent,
    TableCardViewComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  view = signal<'list' | 'card'>('card');
  

}
