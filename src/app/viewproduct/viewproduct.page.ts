import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.page.html',
  styleUrls: ['./viewproduct.page.scss'],
})
export class ViewproductPage implements OnInit {
  viewproduct: any = [];
  getuserdata: any = [];
  myproduct: any = [];

  constructor(private alertController: AlertController,
    public router: Router) {

  }

  ngOnInit() {

    let added_product: any = localStorage.getItem('added_product');
    if (added_product != null) {
      this.viewproduct = JSON.parse(added_product);
      // console.log('product of view', this.viewproduct);
      this.getuserlogedindata();

    }
  }


  getuserlogedindata() {
    let getuser: any = localStorage.getItem('Login_user');
    this.getuserdata = JSON.parse(getuser);
    this.viewproduct.forEach((element: any) => {
      if (element.email == this.getuserdata.email) {
        this.myproduct.push(element);
        // console.log('my product get item', this.myproduct);
      }
    });

  }
  async deleteitem(product_id: any, i: any) {
    // console.log('indexnxbnxxnbx  ==', product_id);
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {
            // console.log('id mil rhihai', product_id);
            this.myproduct.splice(i, 1);
            let index = this.viewproduct.findIndex((element : any ) => element.product_id == product_id);
            // console.log('indexxx',index);
            this.viewproduct.splice(index, 1);
            localStorage.setItem('added_product',JSON.stringify(this.viewproduct));
            // console.log('Login user product',this.myproduct);
            // console.log('All product',this.viewproduct);
          },
        },
      ],
    });

    await alert.present();
  }
}
