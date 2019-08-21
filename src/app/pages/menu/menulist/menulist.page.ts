import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "../../../services/env.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {MenudetailPage} from "../menudetail/menudetail.page";
import {UtilService} from "../../../services/util.service";


@Component({
selector: 'app-menulist',
  templateUrl: './menulist.page.html',
  styleUrls: ['./menulist.page.scss'],
})
export class MenulistPage implements OnInit {
  menus;
  token: any;
  id;

  constructor(
      private authService:AuthService,
      // private navParam: NavParams,
      private navCtrl: NavController,
      private http: HttpClient,
      private env: EnvService,
      private modalCtrl: ModalController,
      private activatedRoute: ActivatedRoute,
      private utilService: UtilService
  ) { }

  ngOnInit() {
    // this.id = this.navParam.get('id');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getToken().then(() => {

    }).catch().finally( () => {
      this.token = this.authService.token;
      this.getMenuList();
    });
  }

  getMenuList(){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    this.http.post(this.env.API_URL + 'auth/menulist',{id:this.id}, {headers: headers})
        .subscribe((menus: any) => {
            this.menus = menus;

        })

  }



  async modalMenuDetail(id){
    let query = {
      id: id
    }
    const menudetailModal = await this.modalCtrl.create({
      component: MenudetailPage,
      componentProps: query
    });
    return await menudetailModal.present();

  }

  goBack() {
    this.navCtrl.navigateRoot('/dashboard');
  }

  goToCart(){
    this.navCtrl.navigateRoot('/cart');
  }


}
