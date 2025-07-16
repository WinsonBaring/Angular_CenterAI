import { Component, computed, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { User } from "@/data/users"

@Component({
  selector: 'app-user-component',
  imports: [],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css'
})
export class UserComponentComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selectedUserId!: boolean;
  // user = input.required<User>();
  // signal = signal(this.user().avatar);
  @Output() select = new EventEmitter<string>();

  // get imagePath() {
  //   return 'assets/users/' + this.user().avatar
  // }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
