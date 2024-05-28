import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon : 'list', route: 'list' },
    { label: 'Agregar', icon : 'add', route: 'new-hero' },
    { label: 'Buscar', icon : 'search', route: 'search' },
  ];

  constructor(private authSrv: AuthService, private router: Router) {}

  get loggedUser():User | undefined {
    return this.authSrv.currentUser;
  }

  onLogout() {
    this.authSrv.logOut();
    this.router.navigateByUrl('/auth/login');
  }

};

