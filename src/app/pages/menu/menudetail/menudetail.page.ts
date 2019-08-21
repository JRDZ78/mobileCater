import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "../../../services/env.service";
import {User} from "../../../models/user";
import {CartService} from "../../../services/cart.service";
import {AlertService} from "../../../services/alert.service";
import {UtilService} from "../../../services/util.service";

@Component({
  selector: 'app-menudetail',
  templateUrl: './menudetail.page.html',
  styleUrls: ['./menudetail.page.scss'],
})
export class MenudetailPage implements OnInit {
  menu_details;
  token: any;
  id;
  user: User;

  constructor(
      private navParam: NavParams,
      private authService: AuthService,
      private http: HttpClient,
      private env: EnvService,
      private modalCtrl: ModalController,
      private cartService: CartService,
      private alertService: AlertService,
      private utilService: UtilService
  ) {}

  ngOnInit() {
    this.id = this.navParam.get('id');
    this.authService.getToken().then(() => {

    }).catch().finally( () => {
      this.token = this.authService.token;
      this.getMenuDetail();
    });
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  getMenuDetail(){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    this.http.post(this.env.API_URL + 'auth/menudetail',{id:this.id}, {headers: headers})
        .subscribe((menu_details: any) => {
            this.menu_details = menu_details;
        })
  }

  addToCart(user_id, menu_id, cater_id) {
    this.cartService.addToCart(user_id, menu_id, cater_id).subscribe(
        data => {
          this.alertService.presentToast(data['message']);
          this.modalCtrl.dismiss();
        }
    );
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
