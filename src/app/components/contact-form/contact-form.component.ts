import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact, ContactService } from '@/service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit{
  @Input() contactForm!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<ContactFormComponent>);
  // private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);
  @Output() valueChanged = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    // Basic check to ensure the FormGroup was passed correctly
    if (!this.contactForm) {
      console.error('ContactFormComponent: contactForm @Input() was not provided!');
      // You might throw an error or handle this gracefully depending on app needs
      return;
    }

    // Optional: If you need to react to changes within this child component
    // without the parent needing to explicitly listen to valueChanged
    this.contactForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.valueChanged.emit(this.contactForm);
        console.log(this.contactForm.value);
        // console.log('ContactForm value changed within child:', value);
        // If you still need to notify the parent about *every* change, uncomment:
        // this.valueChanged.emit(value); // Assuming valueChanged is still desired to emit raw value
      });
  }

  // contactForm: FormGroup = this.fb.group({
  //   name: ['', [Validators.required, Validators.minLength(3)]],
  //   phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
  //   email: ['', [Validators.required, Validators.email]],
  // });

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
}
