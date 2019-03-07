import { Component } from '@angular/core';
import { NavController,NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { missionService } from '../../providers/missionService';
import { mockTypes } from '../../mockData/mockTypes';

@Component({
  selector: 'page-addTasks',
  templateUrl: 'addTasks.html',
  styles: ['./addTasks.scss'],
})
export class AddTaskPage {
   ans;
   userInfo;
   taskType=mockTypes;
  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public alertCtrl: AlertController,
             public missionService: missionService) {
         this.userInfo=navParams;
  }

  showSuccess() {
    const alert = this.alertCtrl.create({
      title: '发布成功',
      subTitle: '您可以到个人中心查看您发布的任务',
      buttons: ['确认']
    });
    alert.present();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '错误提示',
      subTitle: '请完善任务信息',
      buttons: ['确认']
    });
    alert.present();
  }
  addTask(missionname,missionpay,missionaddress,missiondeadline,category,maxnumber,description){
  
    if(!missionname||!missionpay||!missionaddress||!missiondeadline||!category||!maxnumber||!description)
      {  this.showAlert();
          return;
      }
      var type= this.taskType[category-1].title;
      console.log(type);
    var mission={
          "missionname":missionname,
          "missionpay":missionpay,
          "missionaddress":missionaddress,
          "missiondeadline":missiondeadline,
          "category":type,
          "categoryId":category,
          "maxnumber":maxnumber,
          "description":description,
          "publisherid":this.userInfo.get('user_id'),
          "publishername":this.userInfo.get('realname'),
          "publisherphone":this.userInfo.get('phone')
      }

     var responseMessage=this.missionService.addMissions(JSON.stringify(mission));
     responseMessage.subscribe( response => {
     // console.log(response["_body"]);
      //console.log(JSON.parse(response._body));
         console.log(response._body);
         console.log(typeof(response["_body"]));     
        this.ans=response["_body"];
        this.ans=this.ans.substring(1,this.ans.length-1);
        console.log(this.ans);
        //  this.userInfo=JSON.parse(this.ans);
        //     console.log(this.userInfo['user_id']);
        //     console.log(typeof(this.userInfo));
        //     this.navCtrl.push(TabsPage,this.userInfo);
     });
       this.showSuccess();
       this.navCtrl.pop();
    //this.navCtrl.push(TabsPage);
  }

}
