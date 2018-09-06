import * as firebase from 'firebase';

export class AuthService {
    token: string;

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            err => console.log(err)
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response: Response) => {
                return firebase.auth().currentUser.getToken()
                .then (
                    (token: string) => this.token = token
                );
            }
        )
        .catch(
            err => console.log(err)
        );
    }

    signOut(){
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then (
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuth() {
        return this.token != null;
    }
}