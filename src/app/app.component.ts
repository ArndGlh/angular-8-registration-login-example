import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

        let user = new  User;
        let users = [];
        user.username = "Lisa";
        user.password = "Je t'aime"
        user.id = 1;
        user.firstName = "Lisa";
        user.lastName = "Labeque";
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}