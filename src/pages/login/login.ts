import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from './register';
import { userService } from '../../providers/userService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['./login.scss'],
})
export class LoginPage {

  private userInfo;
  private ans:string;
  constructor(public navCtrl: NavController,
             public userService:userService,
              public alertCtrl: AlertController) {

  }

  public loginWithoutPhoneAndPassword(){
    this.navCtrl.push(TabsPage,this.userInfo);
  }
  
  public login(phone,password)
  {
    if(!phone||!password)
    {
     this.showAlert();
     return;
    }
     var user={
       "phone":phone,
       "pwd":password
     }
     console.log(user);
       console.log(user['phone']);
     //  console.log(JSON.stringify(user));
     //this.userService.sendMessage(JSON.stringify(user));
     
     var responseMessage=this.userService.login(JSON.stringify(user));
     responseMessage.subscribe( response => {
     // console.log(response["_body"]);
      //console.log(JSON.parse(response._body));
       if(response["_body"]){
         console.log(typeof(response["_body"]));     
        this.ans=response["_body"];
        console.log(this.ans);
         this.userInfo=JSON.parse(this.ans);
            console.log(this.userInfo['user_id']);
            console.log(typeof(this.userInfo));
            this.navCtrl.push(TabsPage,this.userInfo);
       }
       else
           this.showAlert();
      
       });
     
    }

    showAlert() {
      const alert = this.alertCtrl.create({
        title: '错误提示',
        subTitle: '用户名或密码有误',
        buttons: ['确认']
      });
      alert.present();
    }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
