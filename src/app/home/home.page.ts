import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MycomponentComponent } from 'src/app/mycomponent/mycomponent.component';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  login_user_data: any = [];
  viewproduct: any = [];
  cartitems: any = [];
  login_user_cart: any = [];
  fullname: any;
  email: any;
  password: any;



  constructor(
    public alertController: AlertController,
    public router: Router,
    public toastController:ToastController,
    public modalCtrl: ModalController
  ) {



  }

  ngOnInit() {


  }
  ionViewWillEnter() {
    this.getdata();
    this.getmycart();
    this.getProducts();
  }

  getProducts() {
    let added_product: any = localStorage.getItem('added_product');
    if (added_product != null) {
      this.viewproduct = JSON.parse(added_product);
    }
  }


  getdata() {
    let getadata: any = localStorage.getItem('Login_user');
    if (getadata != null) {
      this.login_user_data = JSON.parse(getadata);
      this.fullname = this.login_user_data['fullname'];
      this.email = this.login_user_data['email'];
      this.password = this.login_user_data['password'];
    }
  }

  getmycart() {
    this.login_user_cart = [];
    let getadata: any = localStorage.getItem('my_cart');
    if (getadata != null) {
      this.cartitems = JSON.parse(getadata);
      // console.log('My cart Recieved = ',this.cartitems);
      this.cartitems.forEach((element: any) => {
        // console.log('For each element = ',element);
        if (element.email == this.login_user_data.email) {
          this.login_user_cart.push(element);
          console.log('logind added itens', this.login_user_cart);
        }
      });
    }

  }

  async logout(position: 'bottom') {
    this.login_user_data = '';
    localStorage.removeItem("Login_user");
    const toast = await this.toastController.create({
      message: 'Logout Successfully',
      duration: 1500,
      position: position,
    });
    await toast.present();
    this.router.navigate(['/']);
  }
 
  async addtocart(items: any) {
    console.log(items);
    let index = this.cartitems.findIndex((element: any) => element.product_id == items.product_id)
    // console.log('Find index = ', index)
    if (index != -1) {
      const alert = await this.alertController.create({
        header: 'Warning!',
        message: 'Already Added in Cart',
        buttons: ['OK'],
      });
      await alert.present();
      console.log('items already added in cart');
    }
    else {
      items['email'] = this.login_user_data.email
      items['quantity'] = 1
      this.cartitems.push(items);
      // console.log('cartitems' , this.cartitems);
      localStorage.setItem('my_cart', JSON.stringify(this.cartitems));
      this.getProducts();
      this.getmycart();
      const alert = await this.alertController.create({
        header: 'Cart!',
        message: 'Added Successfully',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }
  public check(id: any) {
    if (this.login_user_cart != null) {
      let index = this.login_user_cart.findIndex((element: any) => element.product_id == id);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
  }



  async openModal(get_product_id: any) {
    // console.log('comment senditems',product_id);
    const modal = await this.modalCtrl.create({
      component: MycomponentComponent,
      componentProps: {
        get_product_id : get_product_id
      }
      

    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }
  chat(){
    
  }


}
