import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactComponent } from '../../update-contact/update-contact.component';
import { DeleteContactComponent } from '@/components/delete-contact/delete-contact.component';
import { Contact } from '@/service/contact.service';

@Component({
  selector: 'app-table-button',
  imports: [],
  templateUrl: './table-button.component.html',
  styleUrl: './table-button.component.css'
})
export class TableButtonComponent {
  readonly dialog = inject(MatDialog);
  @Input() contact!: any;

  openUpdateDialog() {
    this.dialog.open(UpdateContactComponent,{
      data: this.contact
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteContactComponent,{
      data: this.contact
    });
  }
}
