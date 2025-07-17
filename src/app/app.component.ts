import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbdModalComponent } from '@/components/modal-component/modal-component.component';
import { ProductService } from '@/shared/product.service';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbdModalComponent,
    NavbarComponent,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}