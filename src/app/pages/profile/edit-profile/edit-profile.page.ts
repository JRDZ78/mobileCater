import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {AlertService} from "../../../services/alert.service";
import { NgForm } from '@angular/forms';
import {User} from "../../../models/user";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User;

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private alertService: AlertService
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

  goBack() {
    this.navCtrl.navigateRoot('/profile');
  }

  editProfile(form: NgForm, id) {
    this.authService.editProfile(form.value.username, form.value.firstname, form.value.lastname, form.value.email, form.value.phone, form.value.address, form.value.date_of_birth, id).subscribe(
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
