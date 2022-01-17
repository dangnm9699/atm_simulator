import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('httpHeaders');
    
    if (token === undefined || token === null || token === 'null' || token === '') {
      console.log('3.auth-guard');
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    console.log(token, state.url);
    try {
      if (this.router.url === '/') {    
        localStorage.clear()
        this.router.navigate(['/auth']);
        return false;
      }
      if (state.url === '/pages' || state.url === '/pages/report/manager' ||
        state.url === '/pages/sys-config/sys-home' || state.url === '/pages/404' || state.url === '/404' ||
        state.url.indexOf('assets/i18n/') > -1) {
        return true;
      }
      // }
    } catch (e) {
      // console.log('exception:', checkRole)
      console.log('4.auth-guard');
      localStorage.clear();
      this.router.navigate(['/auths/login']);
      return false;
    }
    return true;
  }
}
