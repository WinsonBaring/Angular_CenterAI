import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { ContactService } from '@/service/contact.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CONTACT_INFO_URL } from '@/constants/variables';


@Component({
  selector: 'app-table-list-view',
  imports: [
    RouterLink
  ],
  templateUrl: './table-list-view.component.html',
  styleUrl: './table-list-view.component.css'
})
export class TableListViewComponent {
  CONTACT_INFO_URL = CONTACT_INFO_URL;
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
