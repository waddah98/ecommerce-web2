import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data?.['role'];

    if (this.authService.isAuthenticated() && this.authService.getRole() === requiredRole) {
      return true;
    }

    const userRole = this.authService.getRole();
    if (userRole === 'admin') {
      this.router.navigate(['/admin/home']);
    } else if (userRole === 'customer') {
      this.router.navigate(['/client/home']);
    } else {
      this.router.navigate(['']);
    }

    return false;
  }
}
