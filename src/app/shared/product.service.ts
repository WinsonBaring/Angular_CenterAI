// src/app/shared/product.service.ts
// (Assuming this path is correct based on your previous component's import: '@shared/product.service')

import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service'; // Adjust path if SupabaseService is in a different shared subfolder
import { from, Observable, throwError } from 'rxjs'; // Import 'from' to convert Promise to Observable
import { catchError, map } from 'rxjs/operators'; // For error handling within the Observable stream
import { HttpClient } from '@angular/common/http';

// Assuming you have this Product interface in src/app/shared/models/product.model.ts
export interface Product {
    id?: number; // Supabase usually auto-generates ID
    name: string;
    description: string;
    price: number;
    // Add other properties that match your Supabase 'Products' table
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // FIX 1: Use lowercase for injected service property names (convention)
    private supabaseService = inject(SupabaseService);
    private http = inject(HttpClient);

    // FIX 2: No need to initialize in constructor if using 'inject' outside
    constructor() { }

    /**
     * Fetches all products from the Supabase 'Products' table.
     * Converts the Supabase Promise to an RxJS Observable.
     */
    getProducts(): Observable<Product[]> { // FIX 3: Define return type as Observable<Product[]>
        // FIX 4: Access the Supabase client via the public getter 'client'
        const queryPromise = this.supabaseService.supabase
            .from('Products') // Ensure 'Products' matches your Supabase table name exactly (case-sensitive)
            .select('*')
            .order('id', { ascending: true });

        // Convert the Promise returned by Supabase to an Observable
        return from(queryPromise).pipe(
            // FIX 5: Handle errors within the RxJS pipeline
            catchError((error: any) => {
                console.error('Supabase getProducts Error:', error);
                // Rethrow the error as an RxJS error Observable
                return throwError(() => new Error(error.message || 'Failed to fetch products from Supabase.'));
            }),
            // FIX 6: Map the response to extract 'data' and handle potential null/undefined
            map(response => {
                if (response.error) {
                    throw response.error; // Throw Supabase specific error
                }
                return response.data as Product[] || []; // Ensure it's an array of Product
            })
        );
    }

    /**
     * Adds a new product to the Supabase 'Products' table.
     */
    createProduct(product: Omit<Product, 'id'>): Observable<Product> {
        const queryPromise = this.supabaseService.supabase
            .from('Products')
            .insert(product)
            .select() // Select the newly inserted row
            .single(); // Expect a single object back

        return from(queryPromise).pipe(
            catchError((error: any) => {
                console.error('Supabase createProduct Error:', error);
                return throwError(() => new Error(error.message || 'Failed to create product.'));
            }),
            map(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data as Product; // Ensure it's a single Product
            })
        );
    }

    /**
     * Updates an existing product in the Supabase 'Products' table.
     */
    updateProduct(product: Product): Observable<Product> {
        if (!product.id) {
            return throwError(() => new Error('Product ID is required for update.'));
        }
        const queryPromise = this.supabaseService.supabase
            .from('Products')
            .update(product)
            .eq('id', product.id) // Match the product by its ID
            .select() // Select the updated row
            .single();

        return from(queryPromise).pipe(
            catchError((error: any) => {
                console.error('Supabase updateProduct Error:', error);
                return throwError(() => new Error(error.message || 'Failed to update product.'));
            }),
            map(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data as Product;
            })
        );
    }

    /**
     * Deletes a product from the Supabase 'Products' table.
     */
    deleteProduct(id: number): Observable<void> { // Return void as delete usually returns no body
        const queryPromise = this.supabaseService.supabase
            .from('Products')
            .delete()
            .eq('id', id); // Match the product by its ID

        return from(queryPromise).pipe(
            catchError((error: any) => {
                console.error('Supabase deleteProduct Error:', error);
                return throwError(() => new Error(error.message || 'Failed to delete product.'));
            }),
            map(response => {
                if (response.error) {
                    throw response.error;
                }
                return; // Return void on success
            })
        );
    }

}