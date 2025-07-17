import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { mustContainQuestionMark } from './util';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" 
    >
      @if(form.get('username')?.touched && (form.get('username')?.value === '')){
        <p class="control-error">Username is required</p>
      }
      <input 
        formControlName="username" 
        required="true"
        placeholder="Username"
        [class.control-error]="form.get('username')?.touched && (form.get('username')?.value === '')"
      />
      @if(form.get('password')?.touched && (form.get('password')?.value === '')){
        <p class="control-error">Password is required</p>
      }
      <input 
        formControlName="password" 
        required="true"
        placeholder="Password"
        [class.control-error]="form.get('password')?.touched && (form.get('password')?.value === '')"
      />
      <button 
        type="submit"
        [disabled]="form.invalid"
        class="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition duration-150"
      >
        Submit
      </button>
    </form>
  `,
  styles: [`
    /* Fallback for violet if Tailwind or custom theme is not available */
    .control-error {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: rgb(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);
  height: 0.5rem;
  padding: 0.25rem 0 0 0;
  height: 1.5rem;
  margin-bottom: 1rem;
}
  `]
})
export class ReactiveFormComponent {
  destroyRef = inject(DestroyRef)
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), mustContainQuestionMark],
      updateOn: 'blur'
    }),
  });
  ngOnInit() {
    const savedUsername = window.localStorage.getItem('username')
    const savedPassword = window.localStorage.getItem('password')
    if (savedUsername) {
      const parsedUsername = JSON.parse(savedUsername)
      this.form.patchValue({
        username: parsedUsername
      })
    }
    if (savedPassword) {
      const parsedPassword = JSON.parse(savedPassword)
      this.form.patchValue({
        password: parsedPassword
      })
    }
    const subscription = this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe({
      next: (value) => {
        window.localStorage.setItem('username', JSON.stringify(value.username))
        window.localStorage.setItem('password', JSON.stringify(value.password))
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
  onSubmit() {
    console.log(this.form)
  }
}