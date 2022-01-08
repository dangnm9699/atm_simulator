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
    let checkRole = false;
    const obj = JSON.parse(localStorage.getItem('objects'));
    try {
      if (state.url === '/pages' || state.url === '/pages/report/manager' ||
        state.url === '/pages/sys-config/sys-home' || state.url === '/pages/404' || state.url === '/404' ||
        state.url.indexOf('assets/i18n/') > -1) {
        return true;
      }
      // for (let i = 0; i < obj?.length; i++) {
      //   const path = state.url.substring(0, obj[i].link?.length);
      //   if (path !== '' && path !== undefined && obj[i].link === path) {
      //     console.log("role", obj[i]);

      //     role.slice(0, role.length);
      //     role.push(obj[i]);
      //     checkRole = true;
      //   }
      // }
      // if (!checkRole) {
      //   console.log('checkRole:', checkRole)
      //   // this.router.navigate(['/pages/report/manager']);
      //   this.router.navigate(['/404']);
      //   return false;
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
