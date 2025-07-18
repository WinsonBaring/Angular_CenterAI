import { SupabaseService } from '@/shared/supabase.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  http = inject(HttpClient);
  private supabaseService = inject(SupabaseService);
    // private apiUrl = 'http://localhost:3000/contacts';

  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this.apiUrl);
  // }
  // getContact(id: number): Observable<Contact> {
  //   return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  // }
  // addContact(contact: Contact): Observable<Contact> {
  //   return this.http.post<Contact>(this.apiUrl, contact);
  // }
  // updateContact(id: string, contact: Contact): Observable<Contact> {
  //   return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  // }
  // deleteContact(id: string): Observable<Contact> {
  //   return this.http.delete<Contact>(`${this.apiUrl}/${id}`);
  // }

  getContacts(): Observable<Contact[]> {
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .select('*')
      .order('id', { ascending: true });

    return from(queryPromise).pipe(
      catchError((error: any) => {
        console.error('Supabase getContacts Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contacts from Supabase.'));
      }),
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Contact[] || [];
      })
    );
  }

  getContact(id: string): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .select('*')
      .eq('id', id)
      .single();

    return from(queryPromise).pipe(
      catchError((error: any) => {
        console.error('Supabase getContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contact from Supabase.'));
      }),
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Contact;
      })
    );
  }

  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .insert(contact)
      .select()
      .single();

    return from(queryPromise).pipe(
      catchError((error: any) => {
        console.error('Supabase addContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to add contact.'));
      }),
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Contact;
      })
    );
  }

  updateContact(id: string, contact: Partial<Contact>): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .update(contact)
      .eq('id', id)
      .select()
      .single();

    return from(queryPromise).pipe(
      catchError((error: any) => {
        console.error('Supabase updateContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to update contact.'));
      }),
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Contact;
      })
    );
  }

  deleteContact(id: string): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .delete()
      .eq('id', id)
      .select()
      .single();

    return from(queryPromise).pipe(
      catchError((error: any) => {
        console.error('Supabase deleteContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to delete contact.'));
      }),
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Contact;
      })
    );
  }
}
