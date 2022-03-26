import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthNGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.loggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}