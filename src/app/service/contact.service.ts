import { SupabaseService } from '@/shared/supabase.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from, throwError, BehaviorSubject, of, Subject } from 'rxjs'; // CHANGED: Subject to BehaviorSubject
import { catchError, map, shareReplay, switchMap, tap, finalize } from 'rxjs/operators';

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

  // --- Central Revalidation Trigger ---
  // CHANGED: Use BehaviorSubject with an initial value (e.g., undefined or null)
  // This ensures it emits its current value to new subscribers immediately.
  private _revalidateContactsTrigger = new BehaviorSubject<void>(undefined); // Initial void value

  // --- The HOT Observable that components will subscribe to ---
  private _contacts$: Observable<Contact[]>;

  constructor() {
    this._contacts$ = this._revalidateContactsTrigger.pipe(
      // The tap here is purely for logging.
      tap(() => console.log('Service: Revalidation trigger fired. Starting new fetch...')),
      switchMap(() => this.getContactsDataFromSupabase().pipe(
        // shareReplay here for the inner Observable result
        shareReplay({ bufferSize: 1, refCount: true })
      )),
      // shareReplay for the OUTER Observable _contacts$ itself.
      // This is crucial for making _contacts$ hot and re-fetchable.
      // With BehaviorSubject as the trigger, this shareReplay's refCount will ensure
      // the underlying Supabase fetch is connected/disconnected correctly.
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // No explicit _revalidateContactsTrigger.next() here in constructor anymore.
    // The BehaviorSubject's initial value will trigger the first fetch automatically
    // when the first component subscribes to _contacts$.
  }

  // --- Actual Data Fetching Logic (private) ---
  private getContactsDataFromSupabase(): Observable<Contact[]> {
    console.log('Service: --- Supabase API Call Initiated ---');
    const queryPromise = this.supabaseService.supabase
      .from('Contacts')
      .select('*')
      .order('id', { ascending: true });

    return from(queryPromise).pipe(
      map(response => {
        if (response.error) { throw response.error; }
        return response.data as Contact[] || [];
      }),
      catchError((error: any) => {
        console.error('Supabase getContacts Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contacts from Supabase.'));
      })
    );
  }

  // --- Public Method for Components to Get Contacts ---
  public getContacts(): Observable<Contact[]> {
    return this._contacts$; // Return the single, hot, re-fetchable Observable
  }

  // --- Public Method to Trigger Revalidation from Anywhere ---
  public revalidateContacts(): void {
    console.log('Service: Public revalidateContacts() called.');
    // No specific value needed for void Subject, just trigger the emission.
    this._revalidateContactsTrigger.next(undefined);
  }

  // --- CUD Operations (Trigger Revalidation after successful CUD) ---
  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase.from('Contacts').insert(contact).select().single();
    return from(queryPromise).pipe(
      map(response => {
        if (response.error) { throw response.error; }
        console.log('Service: Contact added, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after add
        return response.data as Contact;
      }),
      catchError((error: any) => {
        console.error('Supabase addContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to add contact.'));
      })
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase.from('Contacts').update(contact).eq('id', contact.id).select().single();
    return from(queryPromise).pipe(
      map(response => {
        if (response.error) { throw response.error; }
        console.log('Service: Contact updated, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after update
        return response.data as Contact;
      }),
      catchError((error: any) => {
        console.error('Supabase updateContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to update contact.'));
      })
    );
  }

  deleteContact(id: string): Observable<Contact> {
    const queryPromise = this.supabaseService.supabase.from('Contacts').delete().eq('id', id).select().single();
    return from(queryPromise).pipe(
      map(response => {
        if (response.error) { throw response.error; }
        console.log('Service: Contact deleted, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after delete
        return response.data as Contact;
      }),
      catchError((error: any) => {
        console.error('Supabase deleteContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to delete contact.'));
      })
    );
  }
}