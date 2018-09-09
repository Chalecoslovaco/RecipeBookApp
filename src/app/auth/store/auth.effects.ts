import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actions$.ofType(AuthActions.TRY_SIGNUP)
        .pipe(map((action: AuthActions.TrySignUp) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: {email: string, password: string}) => {
           return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            return [{type: AuthActions.SIGN_UP}, {type: AuthActions.SET_TOKEN, payload: token}];
        }));

    @Effect()
    authSignIn = this.actions$.ofType(AuthActions.TRY_SIGNIN)
        .pipe(map((action: AuthActions.TrySignUp) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: {email: string, password: string}) => {
           return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{type: AuthActions.SIGN_IN}, {type: AuthActions.SET_TOKEN, payload: token}];
        }));

    @Effect({dispatch: false})
    authSignOut = this.actions$.ofType(AuthActions.SIGN_OUT)
        .pipe(tap(() =>{
            this.router.navigate(['/']);    
        }))

    constructor(private actions$: Actions, 
        private router: Router) {}
}