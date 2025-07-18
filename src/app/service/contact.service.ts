import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/contacts';

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getContact(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }
}
