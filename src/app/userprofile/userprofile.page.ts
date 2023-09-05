import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  fullname: any;
  email: any;
  password: any;
  userdata: any;
  profile_image: any;
  login_user_data: any = [];
  registeruser: any = [];
  imageUrl: any = "";

  constructor(public alertController: AlertController,
    public router: Router) {

  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.get_login_User();
    this.getdata();
    console.log('profile image',this.profile_image);
    console.log('image url',this.imageUrl);
  }


  get_login_User() {
    let data: any = localStorage.getItem('Login_user');
    console.log();
    if (data != null) {
      this.login_user_data = JSON.parse(data);
      console.log('Recieved all data from Login_user', this.login_user_data);
      this.fullname = this.login_user_data['fullname'];
      this.email = this.login_user_data['email'];
      this.password = this.login_user_data['password'];
      this.profile_image = this.login_user_data['profile_dp'];
    }
  }
  getdata() {
    let getadata: any = localStorage.getItem('register_user');
    if (getadata != null) {
      this.registeruser = JSON.parse(getadata);
      console.log('Recieved all data from localstorage', this.registeruser);
    }

  }
  async Updateprofile() {

    let index = this.registeruser.findIndex((element: any) => element.email === this.email);
    console.log('indexxxxxxxxxxxx', index);

    let newUserData: any = {
      uid:this.login_user_data.uid,
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      profile_dp: this.imageUrl
    }
    this.registeruser[index] = newUserData;
    localStorage.setItem('register_user', JSON.stringify(this.registeruser));
    this.imageUrl != '';
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Successfully Updated!',
      buttons: ['OK'],
    });
    await alert.present();
    


  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    // console.log('image',image);


    this.imageUrl = image.webPath;

  };

}
