import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HTTP} from '@ionic-native/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {EnvService} from './env.service';
import {User} from '../models/user';
import {CateringService} from "../models/catering_service";

@Injectable({
    providedIn: 'root'
})


export class AuthService {
    isLoggedIn = false;
    token: any;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService,
    ) {
    }

    login(username: String, password: String) {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/login',
            {username: username, password: password}, {headers: headers}
        ).pipe(
            tap(token => {
                this.storage.set('token', token)
                    .then(
                        () => {
                            console.log('Token Stored');
                        },
                        error => console.error('Error storing item', error)
                    );
                this.token = token;
                this.isLoggedIn = true;
                return token;
            }),
        );
    }

    register(username: String, firstname: String, lastname: String, email: String, password: String, phone: Number, address: Text, date_of_birth: Date) {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/register',
            {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                address: address,
                date_of_birth: date_of_birth
            }, {headers: headers}
        )
    }

    editProfile(username: String, firstname: String, lastname: String, email: String, phone: Number, address: Text, date_of_birth: Date, id) {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/editProfile',
            {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                address: address,
                date_of_birth: date_of_birth,
                id: id
            }, {headers: headers}
        )
    }

    changePassword(old_password: String, password: String, id){
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/changePassword',
            {
                old_password:old_password,
                password:password,
                id: id
            }, {headers: headers}
        )
    }


    logout() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });
        return this.http.get(this.env.API_URL + 'auth/logout', {headers: headers})
            .pipe(
                tap(data => {
                    this.storage.remove("token");
                    this.isLoggedIn = false;
                    delete this.token;
                    return data;
                })
            )
    }

    user() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });
        return this.http.get<User>(this.env.API_URL + 'auth/user', {headers: headers})
            .pipe(
                tap(user => {
                    return user;
                })
            )
    }

    // cater() {
    //     const headers = new HttpHeaders({
    //         'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    //     });
    //     this.http.get(this.env.API_URL + 'auth/cater', {headers: headers}).subscribe((response) => {
    //         console.log(response);
    //     });
    // }


    getToken() {
        return this.storage.get('token').then(
            data => {
                this.token = data;
                if (this.token != null) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
            },
            error => {
                this.token = null;
                this.isLoggedIn = false;
            }
        );
    }
}
