import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import { NgForm } from '@angular/forms';
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {
  user: User;

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateRoot('/profile');
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
        user => {
          this.user = user;
        }
    );
  }

  changePassword(form: NgForm, id) {
    this.authService.changePassword(form.value.old_password, form.value.password, id).subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/profile');
      }
    );
  }

}
