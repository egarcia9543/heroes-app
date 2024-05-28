import { User } from './../../interfaces/user.interface';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {};

  login() {
    this.authSrv.signIn('john.due@gmail.com', 'John Doe').subscribe(
      user => {
        this.router.navigateByUrl('/');
      }
    )
  }
}
