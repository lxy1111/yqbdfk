import { Component, Input } from '@angular/core';
import { NavController,NavParams, AlertController } from 'ionic-angular';
import { TaskDetailPage } from '../chat/chat';
import { missionService } from '../../providers/missionService';

@Component({
  selector: 'page-entryForm',
  templateUrl: 'entryForm.html',
  styles: ['./entryForm.scss'],
})
export class EntryFormPage {

  ans;
    task;
    groups;
    myInfo;
    public isEntry : boolean = false;

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public alertCtrl: AlertController,
            public missionService:missionService
             ) {
         this.task=navParams.data.task;
        this.myInfo=navParams.data.userInfo;
  }
  
  submitForm(task){
    this.isEntry = true;
    console.log(this.isEntry);
    this.navCtrl.push(TaskDetailPage,{ task:task })
  }

  applyForTasks(experience,applyreason)
  {
    if(!experience||!applyreason)
    {
      this.showAlert();
      return;
    }
          var missionid=this.task.mission_id;
          var applicantid=this.myInfo.get('user_id');
          console.log(applicantid);
         var mission ={
           "missionid":missionid,
           "applicantid":applicantid,
           "experience":experience,
           "applyreason":applyreason
          }
          console.log(missionid);
          console.log(this.task.publisherid);
   var responseMessage=this.missionService.applyForMission(JSON.stringify(mission));
 responseMessage.subscribe( response => {
 // console.log(response["_body"]);
  //console.log(JSON.parse(response._body));
     console.log(typeof(response["_body"]));     
     console.log(response["_body"]);
    this.ans=response["_body"];
    if(this.ans=="true")
    {
      console.log(this.ans);
        this.showSuccess();
        this.navCtrl.pop();
    }
    else{
      this.showAlert();

    }

 });

          
}
showSuccess() {
  const alert = this.alertCtrl.create({
    title: '报名成功',
    subTitle: '可以到个人中心去查看',
    buttons: ['确认']
  });
  alert.present();
}
showAlert() {
  const alert = this.alertCtrl.create({
    title: '错误提示',
    subTitle:'报名失败，请检查是否您已申请或者这是您自己发布的任务',
    buttons: ['确认']
  });
  alert.present();
}

}
