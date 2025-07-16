import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '@/shared/product.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    // ProductListComponent,
    RouterOutlet,
    // RouterLink,
    // RouterLinkActive,
    // LandingPageComponent,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private productService = inject(ProductService);

  // FIX 3: Initialize with an empty array of the correct type (e.g., Product[])
  Products: any[] = []; // Changed 'Products' to 'products' (convention), and added type
  test = "winson";

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => { // Specify the type of data received
        this.Products = data || []; // Handle case where data might be null/undefined
        console.log('Fetched products:', this.Products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        // You might want to set an error message property here to display in the template
        // this.errorMessage = 'Failed to load products.';
      }
    });
  }

}