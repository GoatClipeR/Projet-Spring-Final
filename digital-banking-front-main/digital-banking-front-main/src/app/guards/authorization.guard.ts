import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role']; // récupère "ADMIN"
    const userRoles = this.authService.roles; // rôles de l'utilisateur

    if (userRoles.includes(requiredRole)) {
      return true;
    } else {
      this.router.navigateByUrl("/admin/notAuthorized");
      return false;
    }
  }

}

