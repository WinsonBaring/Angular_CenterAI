import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { Contact, ContactService } from '@/service/contact.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { TableButtonComponent } from '@/components/add-contact/table-button/table-button.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table-list-view',
  imports: [
    CommonModule,
    RouterLink,
    TableButtonComponent
  ],
  templateUrl: './table-list-view.component.html',
  styleUrl: './table-list-view.component.css'
})
export class TableListViewComponent {
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  // contacts: Contact[] = [];
  customContacts: Contact[] = [];
  contact!: Contact;
  contacts = toSignal(this.contactService.getContacts(),{initialValue:[]});
  readonly dialog = inject(MatDialog);

  PhoneNumber(id:string){
    const customPhone = this.contacts().find((contact: Contact) => contact.id === id);
    return customPhone?.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // ngOnInit() {
  //   const subscription = this.contactService.getContacts().subscribe((contacts) => {
  //     this.contacts = contacts;
  //     this.customContacts = this.contacts.map(contact => ({
  //       ...contact,
  //       phone: contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  //     }));
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  openDialog(contact: any) {
    this.dialog.open(UpdateContactComponent, {
      data: contact
    });
  }
}

