import { ContactService } from '@/service/contact.service';
import { Component, DestroyRef,  inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-info-id',
  imports: [],
  templateUrl: './contact-info-id.component.html',
  styleUrl: './contact-info-id.component.css'
})
export class ContactInfoIdComponent {
  user_id = inject(ActivatedRoute).snapshot.params['user_id'];
  
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
