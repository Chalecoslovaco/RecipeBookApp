import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router,
        private store: Store<fromApp.AppState>) {}

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new AuthActions.SignUp())
                firebase.auth().currentUser.getToken()
                .then (
                    (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
                )
            }
        )
        .catch(
            err => console.log(err)
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response: Response) => {
                this.store.dispatch(new AuthActions.SignIn());
                this.router.navigate(['/']);
                return firebase.auth().currentUser.getToken()
                .then (
                    (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
                );
            }
        )
        .catch(
            err => console.log(err)
        );
    }

    signOut(){
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.SignOut())
    }
}