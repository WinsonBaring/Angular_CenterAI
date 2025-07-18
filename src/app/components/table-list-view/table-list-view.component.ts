import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { Contact, ContactService } from '@/service/contact.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { TableButtonComponent } from '@/table-button/table-button.component';


@Component({
  selector: 'app-table-list-view',
  imports: [
    RouterLink,
    TableButtonComponent
  ],
  templateUrl: './table-list-view.component.html',
  styleUrl: './table-list-view.component.css'
})
export class TableListViewComponent {
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  contacts: Contact[] = [];
  customContacts: Contact[] = [];
  contact!: Contact;
  readonly dialog = inject(MatDialog);

  PhoneNumber(id:string){
    const customPhone = this.contacts.find(contact => contact.id === id);
    return customPhone?.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  ngOnInit() {
    const subscription = this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.customContacts = this.contacts.map(contact => ({
        ...contact,
        phone: contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      }));
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  openDialog(contact: any) {
    this.dialog.open(UpdateContactComponent, {
      data: contact
    });
  }
}

