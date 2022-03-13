import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.router.url === '/') {    
    //   if (state.url === '/auth/login') {
    //     console.log('vao auth guard/auth/login');
    //     localStorage.clear()
    //     return true;
    //   } 
    //   this.router.navigate(['/auth']);
    //   return false;
    // }
    // return true;
    return true;
  }
}
