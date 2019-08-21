import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "../../services/env.service";
import {AuthService} from "../../services/auth.service";
import {UtilService} from "../../services/util.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
    token: any;
    id;
    orders;

    constructor(
        private http: HttpClient,
        private env: EnvService,
        private authService: AuthService,
        private utilService: UtilService
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter(){
       this.authService.getToken().then(() => {

        }).catch().finally(() => {
            this.token = this.authService.token;
            this.getOrders();
        });
    }

    getOrders() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });

        this.http.post(this.env.API_URL + 'auth/orderlist', {id: this.id}, {headers: headers})
            .subscribe((results: any) => {
                this.orders = results.items;
            })
    }

}
