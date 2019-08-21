import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from "../../services/env.service";
import {ModalController, NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {CartService} from "../../services/cart.service";
import {NgForm} from '@angular/forms';
import {AlertService} from "../../services/alert.service";
import {User} from "../../models/user";
import {json} from "@angular-devkit/core";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    token: any;
    id;
    quantity;
    carts;
    totalAmount;
    user: User;
    valueWeekDay;
    today = new Date().toISOString();

    constructor(
        private http: HttpClient,
        private env: EnvService,
        private modalCtrl: ModalController,
        private authService: AuthService,
        private cartService: CartService,
        private alertService: AlertService,
        private navCtrl: NavController
    ) {
        this.quantity = 1;

    }

    ngOnInit() {


    }

    ionViewWillEnter() {
        this.authService.getToken().then(() => {

        }).catch().finally(() => {
            this.token = this.authService.token;
            this.getCart();

        });
        this.authService.user().subscribe(
            user => {
                this.user = user;
            }
        );
    }

    getCart() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });

        this.http.post(this.env.API_URL + 'auth/cartlist', {id: this.id}, {headers: headers})
            .subscribe((results: any) => {
                this.carts = results.items;
                this.getTotal();
            })
    }

    deleteCart(id) {
        this.cartService.deleteCart(id).subscribe();
        this.ionViewWillEnter();
    }

    checkOut(form: NgForm) {
        // console.log(form.value);

        this.cartService.checkOut(
            form.value.user_id,
            form.value.menu_id,
            this.carts,
            form.value.price,
            form.value.quantity,
            form.value.deliver_date,
            form.value.deliver_location,
            form.value.dateValue,
            form.value.getWeekDay
        ).subscribe(
            data => {
                this.alertService.presentToast(data['message']);
            }
        );
        this.navCtrl.navigateRoot('/order');
        //console.log(this.carts);

    }

    inc(index: number) {
        this.carts[index].quantity++;
        this.getTotal();
    }

    dec(index: number) {
        if (this.carts[index].quantity - 1 < 1) {
            this.carts[index].quantity = 1;
        } else {
            this.carts[index].quantity -= 1;
        }
        this.getTotal();
    }


    getTotal() {
        let total = 0;
        for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].menu_price) {
                total += this.carts[i].menu_price * this.carts[i].quantity;
                this.totalAmount = total;
            }
        }
    }

    splitString(weekList, index: string) {
        weekList = weekList.split(', ');

        if (weekList.indexOf(index) === -1) {
            return true;
        }
        return false;
    }

    checkTotal(total) {
        if (total > 0){
            return false;
        }
        return true;
    }


    onCheckedWeekday(index, day: string, isChecked) {
        let arrayWeekday = this.carts[index].weekdaySelected.split(', ');
        if (isChecked.detail.checked) {
            if (arrayWeekday.indexOf(day) == -1) {
                arrayWeekday.push(day);
            }
        } else {
            if (arrayWeekday.indexOf(day) != -1) {
                arrayWeekday.pop(day);
            }
        }
        console.log(arrayWeekday);
        this.carts[index].weekdaySelected = arrayWeekday.join(', ');
    }

    onChange(value) {
        return value;
    }


}
