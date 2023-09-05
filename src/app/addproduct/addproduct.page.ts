import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  product_id: any;
  product_title: any;
  product_description: any;
  product_price: any;
  count:number = 0;

  add_product: any = [];
  login_user: any = [];

  constructor(public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {

    let get: any = localStorage.getItem('Login_user');
    if (get != null) {
      this.login_user = JSON.parse(get);
      console.log('login datatattatatatat', this.login_user.email);
    }

  }
  ionViewWillEnter() {
    this.getdata();
  }
  async addproduct() {

    let index = this.add_product.findIndex((element : any ) => element.product_id == this.product_id);
    console.log('Index======',index);
    this.count++;
    let saveproduct: any = {
      product_id: this.count,
      product_title: this.product_title,
      product_description: this.product_description,
      product_price: this.product_price,
      email: this.login_user.email
    }

    if (this.product_title != null && this.product_description != null && this.product_price != null && index == -1) {
      this.add_product.push(saveproduct);
      localStorage.setItem('added_product', JSON.stringify(this.add_product));
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Product Added Successfully',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home']);
    }
    else{
        // console.log('Product Id already registered !');
        const alert = await this.alertController.create({
          header: 'Alert',
          message: 'Product Id already registered !',
          buttons: ['OK'],
        });
        await alert.present();
    }

  }

  getdata() {
    let getadata: any = localStorage.getItem('added_product');
    if (getadata != null) {
      this.add_product = JSON.parse(getadata);
      console.log('Your product is here', this.add_product);
      this.count = this.add_product.length;

    }

  }
}
