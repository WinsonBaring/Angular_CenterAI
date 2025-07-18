import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/contacts';

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }
  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }
  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${this.apiUrl}/${id}`);
  }
}
