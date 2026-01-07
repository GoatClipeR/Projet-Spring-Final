import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(public authService: AuthService) {}

  get welcomeText(): string {
    if (this.authService.roles.includes('ADMIN')) {
      return 'Welcome Admin';
    } else {
      return `Welcome ${this.authService.username}`;
    }
  }
}
