import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue, push, get } from "firebase/database";
const database = getDatabase();
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  getchatuser: any;
  loggedinuser: any;
  chat_text: any = '';
  userallchat: any = [];
  loginuserallchat: any = [];


  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log('Getting data',params);
      this.getchatuser = JSON.parse(params['userdata']);
      console.log('getuserchat', this.getchatuser);

    });

  }

  ionViewWillEnter() {

    let getdata = localStorage.getItem('Login_user');
    if (getdata != null) {
      this.loggedinuser = JSON.parse(getdata);
      console.log('Loggedin User', this.loggedinuser);
      this.getuserchat();
      // this.getloginuserchat();
    }

  }

  ngOnInit() {
  }

  getuserchat() {
    this.userallchat = [];
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + this.getchatuser.uid + '/' + this.loggedinuser.uid);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() != null) {
        let chatList = Object.entries(snapshot.val());
        console.log(chatList);
        let chat: any = [];
        chatList.forEach((element: any) => {
          chat.push({
            Email: element[1].Email,
            Name: element[1].Name,
            Text: element[1].Text,
            Uid: element[1].Uid
          });
        });
        this.userallchat = chat;
        console.log("allchat:", this.userallchat);
        console.log("allchat:", this.userallchat);
        
      }
    });

  }

  // getloginuserchat() {
  //   this.loginuserallchat = [];
  //   const db = getDatabase();
  //   const starCountRef = ref(db, 'users/' + this.loggedinuser.uid + '/' + this.getchatuser.uid);
  //   onValue(starCountRef, (snapshot) => {
  //     if (snapshot.val() != null) {
  //       let chatList = Object.entries(snapshot.val());
  //       console.log(chatList);
  //       let chat: any = [];
  //       chatList.forEach((element: any) => {
  //         chat.push({
  //           Email: element[1].Email,
  //           Name: element[1].Name,
  //           Text: element[1].Text,
  //           Uid: element[1].Uid
  //         });
  //       });
  //       this.loginuserallchat = chat;
  //       console.log("alluserchat:", this.loginuserallchat);
  //     }
  //   });

  // }




letchat() {
  if (this.chat_text != '') {
    const db = getDatabase();
    push(ref(  db, 'users/' + this.getchatuser.uid + '/' + this.loggedinuser.uid), {
      Sender: 'Sender',
      Email: this.loggedinuser.email,
      Name: this.loggedinuser.fullname,
      Uid: this.loggedinuser.uid,
      Text: this.chat_text,
    });

    push(ref(db, 'users/' + this.loggedinuser.uid + '/' + this.getchatuser.uid), {
      Reciever: 'Reciever',
      Email: this.loggedinuser.email,
      Name: this.loggedinuser.fullname,
      Uid: this.loggedinuser.uid,
      Text: this.chat_text,
    });

    this.chat_text = '';
    // this.allchat = '';

  }

}

}

