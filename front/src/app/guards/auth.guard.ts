import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private authService:AuthService,
    private router: Router,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.getRole() === "admin") {
        this.router.navigate(['/admin/home'])
      } else{
        this.router.navigate(['/client/home'])
      }
      return false;
    }
    return true;
  }


}
