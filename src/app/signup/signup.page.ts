import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fullname: any;
  email: any;
  password: any;
  signupdata: any = [];
  imageUrl: any = '';
  count: number = 0;

  constructor(public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getdata();
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



  async signup() {

    let index = this.signupdata.findIndex((element: any) => element.email == this.email);
    if (index == -1) {
      this.count++;
      let savesignup: any = {
        uid: this.count,
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        profile_dp: this.imageUrl
      }
      this.signupdata.push(savesignup);
      localStorage.setItem('register_user', JSON.stringify(this.signupdata));
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Congratualations',
        message: 'You havs Successfully Sign Up!',
        buttons: ['OK'],
      });
      await alert.present();
      this.signupdata = '';
      this.router.navigate(['/']);
      
    }

    else {
      const alert = await this.alertController.create({
        header: 'Warning!',
        message: 'Email already registered',
        buttons: ['OK'],
      });
      
      await alert.present();
    }

  }

  getdata() {
    let getadata: any = localStorage.getItem('register_user');
    if(getadata != null){
      this.signupdata = JSON.parse(getadata);
      console.log('register_user', this.signupdata)
      this.count = this.signupdata.length;
      console.log('count',this.count); 
    }
     
    }

}
