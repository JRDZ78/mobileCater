import {Component, OnInit} from '@angular/core';
import {ModalController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {User} from 'src/app/models/user';
import {CateringService} from "../../models/catering_service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "../../services/env.service";
import {tap} from "rxjs/operators";
import {HTTP} from '@ionic-native/http/ngx';
import {MenulistPage} from "../menu/menulist/menulist.page";
import {UtilService} from "../../services/util.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    user: User;
    caters;
    token: any;

    constructor(
        private navCtrl: NavController,
        private modalController: ModalController,
        private menu: MenuController,
        private authService: AuthService,
        private http: HttpClient,
        private env: EnvService,
        private utilService: UtilService
    ) {
        this.menu.enable(true);
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.authService.getToken().then(() => {

        }).catch().finally(() => {
            this.token = this.authService.token;
            this.getCaterList();
        });
    }

    getCaterList() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });

        this.http.get(this.env.API_URL + 'auth/cater', {headers: headers})
            .subscribe((caters: any) => {
                this.caters = caters;
            })
    }

    pushMenuList(id) {
        this.navCtrl.navigateForward('/menulist/'+id);
    }


//   async menulist(id) {
//
//     let query = {
//       id: id
//     }
//     const menulistModal = await this.modalController.create({
//       component: MenulistPage,
//       componentProps: query
//     });
//     return await menulistModal.present();
//   }
}