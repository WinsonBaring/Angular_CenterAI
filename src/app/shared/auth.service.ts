import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signal for reactive state management
  public isAuthenticated = signal(false);
  public currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    // Check if user is already logged in (from localStorage)
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.setCurrentUser(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock authentication - in real app, this would be an API call
        if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
          const user: User = {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
            avatar: 'assets/users/user-1.jpg'
          };
          
          this.setCurrentUser(user);
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Method to check if user can access protected routes
  canActivate(): boolean {
    return this.isAuthenticated();
  }
}
