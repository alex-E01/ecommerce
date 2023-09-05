import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mycomponent',
  templateUrl: './mycomponent.component.html',
  styleUrls: ['./mycomponent.component.scss'],
})
export class MycomponentComponent implements OnInit {
  comment_input: any = [];
  loggedinuser: any = [];
  edit: any;
  get_product_id: any;
  comment_section: any = [];
  usercomment: any = [];
  date: any;
  no_of_comment: number = 0;



  constructor(private modalCtrl: ModalController) {


  }

  ngOnInit() {
    this.getloggedinuser();
    this.getcomment();
    let getdate = new Date().toLocaleDateString("en-IN");
    this.date = getdate;
  }



  getloggedinuser() {
    let data: any = localStorage.getItem('Login_user');
    if (data != null) {
      this.loggedinuser = JSON.parse(data);
      // console.log('logged in user', this.loggedinuser);
    }
  }

  getcomment() {
    this.usercomment = [];
    let data: any = localStorage.getItem('comments');
    if (data != null) {
      this.comment_section = JSON.parse(data);
      this.comment_section.forEach((element: any) => {
        if (element.get_product_id == this.get_product_id) {
          this.usercomment.push(element);
          // console.log('user coment', this.usercomment);
        }

      });
      let length = this.comment_section.length;
      this.no_of_comment = length;

    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  edit_comment(item: any) {

    this.edit = item;
    console.log(this.edit);
    this.comment_input = this.edit.comment_input;

  }

  comment() {

    if (this.edit != null) {

      



      
      let index =  this.comment_section.findIndex((element:any ) => element.count == this.edit.count && element.login_user_email == this.edit.login_user_email );
      // console.log(index);
      let save : any = {
        get_product_id: this.edit.get_product_id,
        login_user_email: this.edit.login_user_email,
        comment_input: this.comment_input,
        date: this.edit.date,
        count: this.edit.count
      }
      // console.log('Save edit ',save,index);
      this.comment_section[index] = save;
      
      console.log('after',this.comment_section);
      localStorage.setItem('comments', JSON.stringify(this.comment_section));
      this.comment_input = '';
      this.getcomment();



    } else {
      let no = this.no_of_comment++;
      let savecomment: any = {
        get_product_id: this.get_product_id,
        login_user_email: this.loggedinuser['email'],
        comment_input: this.comment_input,
        date: this.date,
        count: no
      }
      if (this.comment_input != null) {
        this.comment_section.push(savecomment);
        // console.log('comment_section', this.comment_section);
        localStorage.setItem('comments', JSON.stringify(this.comment_section));
        this.getcomment();

      } else {
        console.log('Please comment');
      }
      this.comment_input = '';

    }
  }

  remove_comment(email: any, count: any) {
    // console.log('email & Id & index',email,count);
    let index = this.comment_section.findIndex((element: any) => element.login_user_email == email && element.count == count);
    // console.log('get Index',index);
    this.comment_section.splice(index, 1);
    // console.log('remove =======',this.comment_section);
    localStorage.setItem('comments', JSON.stringify(this.comment_section));
    this.getcomment();
  }



}
