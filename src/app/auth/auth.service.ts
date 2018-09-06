import * as firebase from 'firebase';

export class AuthService {
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            err => console.log(err)
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            res => console.log(res)
        )
        .catch(
            err => console.log(err)
        );
    }
}