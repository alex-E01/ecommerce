import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage implements OnInit {

loginuser:any;
chatuser:any  = [];

  constructor(private router:Router) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getloguser();
    this.getchatuser();
    let index = this.chatuser.findIndex((element:any)=> element.email == this.loginuser.email)
    console.log('loginuser index',index);
    this.chatuser.splice(index,1); 
  }
  

  livechat(item:any){
    const navigationExtras = {
      queryParams: {
        userdata: JSON.stringify(item),
      }
    };
    this.router.navigate(['/chat'],navigationExtras);
  }
  getloguser(){
    let get = localStorage.getItem('Login_user');
    if(get != null)
    {
      this.loginuser = JSON.parse(get);
      console.log('loginuser', this.loginuser);
    }
  }
  getchatuser(){
    let getdata = localStorage.getItem('register_user');
    if(getdata != null){
      this.chatuser = JSON.parse(getdata);
      console.log('all chat user',this.chatuser);
    }
  }
}
