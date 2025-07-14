// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Import RouterOutlet and RouterLink

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterLink,RouterOutlet], // Make sure RouterLink is imported for the buttons
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AI Resume Builder';
}