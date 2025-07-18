import { ContactService } from '@/service/contact.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table-card-view',
  imports: [
    RouterLink
  ],
  templateUrl: './table-card-view.component.html',
  styleUrl: './table-card-view.component.css'
})
export class TableCardViewComponent {
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  contacts: any[] = [];

  ngOnInit() {
    const subscription = this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
