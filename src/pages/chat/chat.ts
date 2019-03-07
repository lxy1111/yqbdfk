import {Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { mockTasks } from '../../mockData/mockTasks';
import { FormBuilder } from '@angular/forms';
import { mockTypes } from '../../mockData/mockTypes';
import { missionService } from '../../providers/missionService';
import { EntryFormPage } from '../entryForm/entryForm';
import { ApplicantPage } from './applicants';

@Component({
  templateUrl: 'TaskDetail.html',
  styles: ['./chat.scss']
})

export class TaskDetailPage {

//@ViewChild(Content) content: Content;
private task;
private ans;
private myInfo;
private types = mockTypes;
private applicants;
private ispublisher;

constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public missionService:missionService,
            public alertCtrl:AlertController,
            public formBuilder: FormBuilder) {
              this.task=navParams.data.task;
              this.myInfo=navParams.data.myInfo;
              if(this.task.publisherid == this.myInfo.get('user_id'))
                this.ispublisher=true;
              else
                this.ispublisher=false;
              }
              
    openEntryForm(task){
      this.navCtrl.push(EntryFormPage,{ task : task,userInfo:this.myInfo });
    }

    viewApplicants(task){
     this.navCtrl.push(ApplicantPage,{task : task})
    }
    
    showSuccess() {
      const alert = this.alertCtrl.create({
        title: '报名成功',
        subTitle: '可以到个人中心去查看',
        buttons: ['确认']});
      alert.present();
    }

    showSuccess2() {
      const alert = this.alertCtrl.create({
                title: '收藏成功',
                subTitle: '可以到个人中心去查看',
                buttons: ['确认']});
      alert.present();
    }

    showAlert() {
      const alert = this.alertCtrl.create({
        title: '错误提示',
        subTitle:'报名失败，请检查是否您已申请或者这是您自己发布的任务',
        buttons: ['确认'] });
      alert.present();
    }
    
    showAlert2() {
      const alert = this.alertCtrl.create({
        title: '错误提示',
        subTitle:'收藏失败，您已收藏过该任务',
        buttons: ['确认']});
      alert.present();
    }

    collectTasks(){ 
      console.log("00000:" + this.task.collection);
      if(this.task.collection == false) {
        this.task.collection = true;
        console.log("11111:" + this.task.collection);
      }
      else if(this.task.collection == true){
        this.task.collection = false;
        console.log("22222:" + this.task.collection);
      }
      
      var missionid = this.task.mission_id;
      var userid = this.myInfo.get('user_id');
      var collectedTasks={
        "missionid":missionid,
        "userid":userid
      }
      var responseMessage = this.missionService.collectMissions(JSON.stringify(collectedTasks));
      responseMessage.subscribe( response => {
        console.log(typeof(response["_body"]));     
        console.log(response["_body"]);
        this.ans=response["_body"];
        if(this.ans == "true"){
          console.log(this.ans);
          this.showSuccess2();
          this.navCtrl.pop();
        }else{
          this.showAlert2();
        }
      });
    }


    applyForTasks(){
      var missionid=this.task.mission_id;
      var applicantid=this.myInfo.get('user_id');
      console.log(applicantid);
      var mission ={
        "missionid":missionid,
        "applicantid":applicantid
      }
      console.log(missionid);
      console.log(this.task.publisherid);
      var responseMessage=this.missionService.applyForMission(JSON.stringify(mission));
      responseMessage.subscribe( response => {
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
      }});           
    }
}

@Component({
  template: `<ion-header>

  <ion-navbar>
    <ion-title>任务</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>
    <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
    <ion-list>
      <ion-item *ngFor="let item of items">
        {{ item }}
      </ion-item>
    </ion-list>
  <ion-list>
    <!-- <ion-list-header>Today</ion-list-header> -->
    <!-- 点击的时候跳转界面 -->
    <ion-item *ngFor="let task of tasks" (click)="openTaskDetailPage(task)">
      <ion-thumbnail item-start>
        <img [src]="task.imageUrl">
      </ion-thumbnail>
      <h2>{{task.title}}</h2>
      <p>{{task.location}}</p>
      <p>{{task.ddl}}</p>
      <ion-note>{{task.pay}}</ion-note>
      <h3 item-end>{{task.state}}</h3>
    </ion-item>

  </ion-list>

</ion-content>`,
   styles: ['./chat.scss']
})
export class ChatPage {
  tasks = [];
  types = mockTypes;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public nav: NavController) {
                this.tasks = mockTasks;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  openTaskDetailPage(task) {
    this.nav.push(TaskDetailPage, { task: task });
  }

}
