import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {UtilService} from "../../services/util.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;

  constructor(
      private authService: AuthService,
      private utilService: UtilService,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  pushEditProfile() {
    this.navCtrl.navigateForward('/edit-profile');
  }

  pushEditPassword() {
    this.navCtrl.navigateForward('/edit-password');
  }

}
