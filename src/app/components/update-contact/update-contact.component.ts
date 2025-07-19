import { Contact, ContactService } from '@/service/contact.service';
import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent {

  readonly dialogRef = inject(MatDialogRef<UpdateContactComponent>);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);
  readonly data = inject<Contact>(MAT_DIALOG_DATA);
  readonly contact = model(this.data);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });
  ngOnInit(){
    this.contactForm.patchValue(this.contact());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  is11Digits() {
    const value = this.contactForm.get('phone')?.value;
    return /^[0-9]{11}$/.test(value);
  }

  isValidEmail() {
    const value = this.contactForm.get('email')?.value;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // console.log('is this it?',this.contact().id);
      this.contactService.updateContact(this.contact().id, this.contactForm.value).subscribe((res) => {
        this._snackBar.open('✔ Changes saved.', '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close();
      });
    }
  }
}
