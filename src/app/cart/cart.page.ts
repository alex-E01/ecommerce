import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  mycart:any =[];
  loggedin_user :any = [];
  login_user_cart : any =[];

  constructor(public alertController: AlertController, public router: Router) { }

  ngOnInit() {

    this.get_login_user_cart();
    let getuserlogindata : any = localStorage.getItem('Login_user');
    if(getuserlogindata != null){
      this.loggedin_user = JSON.parse(getuserlogindata);
      console.log('Logged In User data  =  ',this.loggedin_user);
    }

  }
  ionViewWillEnter(){
    this.getmycart();
    this.get_login_user_cart();
  }

  getmycart(){
      let getadata: any = localStorage.getItem('my_cart');
    if (getadata != null) {
      this.mycart = JSON.parse(getadata);
      console.log('My cart Recieved = ',this.mycart);
    }
  }


  get_login_user_cart(){
    this.mycart.forEach((element: any) => {
      if(element.email == this.loggedin_user.email){
        this.login_user_cart.push(element);
        console.log('login user cart data only = ',this.login_user_cart);
      }     
    });
    
  }

  async deletecartitem(i:any){

    console.log(i);
    this.mycart.splice(i,1);
    this.login_user_cart.splice(i,1);

    // console.log('last mycart deletehjkjfv ',this.mycart)
    localStorage.setItem('my_cart',JSON.stringify(this.mycart));
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Removed Successfully',
      buttons: ['OK'],
    });
    await alert.present();

  }
increment(i:any){

    if(this.mycart[i].quantity >= 0){
      this.mycart[i].quantity++;
      // console.log('cfsghadvn ======',this.mycart);
      localStorage.setItem('my_cart',JSON.stringify(this.mycart));
    }
  
}
decrement(i:any){
  
  if(this.mycart[i].quantity > 1){
    this.mycart[i].quantity -= 1
    localStorage.setItem('my_cart',JSON.stringify(this.mycart));
    
  }



}

  

}
