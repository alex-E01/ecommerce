import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  getuserdata: any = [];
  loginuser: any = [];

  constructor(public router: Router, 
    public alertController: AlertController,
     public toastController:ToastController)
      { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getdata();
    let getuser = localStorage.getItem('Login_user');
    if(getuser != null){
      
    }
  }
  async login(position:'bottom') {

    let index = this.getuserdata.findIndex((element: any) => element.email === this.email && element.password === this.password)
    if (index != -1) {

      // Set key for login user 
      let user = this.getuserdata[index];
      this.loginuser = user;
      localStorage.setItem('Login_user', JSON.stringify(this.loginuser));


      const toast = await this.toastController.create({
        message: 'Login Successfully!',
        duration: 1500,
        position: position,
      });
      
      this.router.navigate(['/home']);
      await toast.present();
    }
    else {
      // console.log('Invalid Username Or Password');
      const alert = await this.alertController.create({
        header: 'Warning!',
        message: 'Invalid Username or Password',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }

  getdata() {
    let getadata: any = localStorage.getItem('register_user');
    if (getadata != null) {
      this.getuserdata = JSON.parse(getadata);
      // console.log('Recieved all data from localstorage', this.getuserdata);
    }

  }
}
