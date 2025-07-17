import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbdModalComponent } from '@/components/modal-component/modal-component.component';
import { ProductService } from '@/shared/product.service';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule, MatDividerModule, MatIconModule


  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
