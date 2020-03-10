import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    endTime  = '2020-03-10T13:00:00';

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
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

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}