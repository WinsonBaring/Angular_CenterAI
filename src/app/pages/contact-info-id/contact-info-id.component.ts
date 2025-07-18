import { ContactService } from '@/service/contact.service';
import { Component, DestroyRef,  inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-info-id',
  imports: [
    RouterLink
  ],
  templateUrl: './contact-info-id.component.html',
  styleUrl: './contact-info-id.component.css'
})
export class ContactInfoIdComponent {
  user_id = inject(ActivatedRoute).snapshot.params['user_id'];
  
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  contact: any;

  ngOnInit() {
    const subscription = this.contactService.getContact(this.user_id).subscribe((contact) => {
      this.contact = contact;
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
