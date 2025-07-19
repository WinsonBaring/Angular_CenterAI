import { ContactService } from '@/service/contact.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TableButtonComponent } from '@/components/table-button/table-button.component';
import { Contact } from '@/service/contact.service';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-table-card-view',
  imports: [
    RouterLink,
    TableButtonComponent
  ],
  templateUrl: './table-card-view.component.html',
  styleUrl: './table-card-view.component.css'
})
export class TableCardViewComponent {
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  customContacts: any[] = [];
  contacts = toSignal(this.contactService.getContacts(),{initialValue:[]});
  contact: any;

  PhoneNumber(id:string){
    const customPhone = this.contacts().find((contact: Contact) => contact.id === id);
    return customPhone?.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // ngOnInit() {
  //   const subscription = this.contactService.getContacts().subscribe((contacts) => {
  //     this.contacts = contacts;
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
  openDialog(contact: Contact) {
    this.dialog.open(UpdateContactComponent, {
      data: contact
    });
  }

}
