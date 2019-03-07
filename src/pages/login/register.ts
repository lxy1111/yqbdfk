import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { userService } from '../../providers/userService';
import { LoginPage } from './login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styles: ['./register.scss'],
})
export class RegisterPage {
           
  ans;
  userInfo;
        
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public userService:userService) {

  }

  showAlert2(){
    const alert = this.alertCtrl.create({
      title: '错误提示',
      subTitle: '该用户已存在',
      buttons: ['确认']
    });
    alert.present();
  }
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: '错误提示',
      subTitle: '请完善个人信息',
      buttons: ['确认']
    });
    alert.present();
  }



  showAlert() {
    const alert = this.alertCtrl.create({
      title: '错误提示',
      subTitle: '密码不一致',
      buttons: ['确认']
    });
    alert.present();
  }

  register(phone,corporation,password1,password2,name,gender,age,job,address){
      if(!phone!||!corporation||!password1||!password2||!name!||gender!||!age!||job!||address)
      {
        this.showAlert3();
        return;
      }
      if(password1!=password2)    
          this.showAlert();
        else{
          var user={
          "phone":phone,
          "password":password1,
          "name":name,
          "corporation":corporation,
          "gender":gender,
          "age":age,
          "job":job,
          "address":address
        }
      var responseMessage=this.userService.register(JSON.stringify(user));
     responseMessage.subscribe( response => {
     // console.log(response["_body"]);
      //console.log(JSON.parse(response._body));
       if(response["_body"]=="true"){
            this.navCtrl.push(LoginPage,this.userInfo);
       }
       else
           this.showAlert();
      
       }); 
  
    }
  }

}
