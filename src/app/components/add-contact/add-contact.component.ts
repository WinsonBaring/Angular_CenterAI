import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '@/service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactFormComponent } from '@/components/contact-form/contact-form.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ContactFormComponent
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  readonly dialogRef = inject(MatDialogRef<AddContactComponent>);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  is11Digits() {
    const value = this.contactForm.get('phone')?.value;
    return /^[0-9]{11}$/.test(value);
  }

  isValidEmail() {
    const value = this.contactForm.get('email')?.value;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe((res) => {
        this._snackBar.open('Contact added successfully', 'Close', {
          duration: 3000,
        });
      });
      this.dialogRef.close();
    }

  }
  onValueChanged(value: FormGroup) {
    this.contactForm.patchValue(value);
    console.log(this.contactForm.value);
  }
}
