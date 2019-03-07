import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { mockTasks } from '../../mockData/mockTasks';
import { TaskDetailPage } from '../chat/chat';
import { FormBuilder } from '@angular/forms';
import { mockMyProfile } from '../../mockData/mockMyProfile';
import { mockSlides } from '../../mockData/mockSlides';
import { mockTypes } from '../../mockData/mockTypes';
import { AddTaskPage } from '../addTasks/addTasks';
import { missionService} from '../../providers/missionService';

@Component({
  templateUrl: 'taskType.html',
  styles: ['./taskType.scss'],
})

export class taskTypePage {

//@ViewChild(Content) content: Content;
myTask = mockTasks;
myInfo;
types = mockTypes;
typeIndex : any;
ans;
allTasks;
constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public missionService: missionService,
            public formBuilder: FormBuilder) {
                this.typeIndex=navParams.data.typeIndex;
                this.myInfo=navParams.data.myInfo;
                this.getAllTasks();
            }

            getAllTasks()
            {
              var message={
                "gettasks":1
              };
              var data = JSON.stringify(message);
              console.log(data);
              var jsonObj = JSON.parse(data);//转换为json对象
               console.log(jsonObj);
             var responseMessage= this.missionService.getAllMissions(JSON.stringify(message));
             responseMessage.subscribe( response => {
                  console.log(response["_body"]);    
                  this.ans=response["_body"];
                  console.log(this.ans);
                this.allTasks=JSON.parse(this.ans);
                for(var i=0;i<this.allTasks.length;i++){
                  console.log(this.allTasks[i]); //取json中的值
                  }
                 // var jsonobj=JSON.parse(this.ans);
        
               // console.log(jsonobj);
              });
            }

            openTaskDetailPage(task) {
              this.navCtrl.push(TaskDetailPage, { task: task,myInfo:this.myInfo });
            }

}


@Component({
  template: `<ion-header>
  <ion-navbar>
    <ion-title>首页</ion-title>
    <button style="background-color: #f8f8f8;
    font-weight: bolder;
    color: #488aff;
    font-size: 3.0rem;
    " (click)="openAddTaskPage()">
    <ion-icon name="add-circle"></ion-icon>
  </button>
  </ion-navbar>
  
</ion-header>

<ion-content padding class="tutorial-page">

  <ion-slides pager  loop="true" autoplay="2500" style="margin-top:0px;  max-height: 240px;">

    <ion-slide *ngFor="let slide of slide">
      <img [src]="slide.imageUrl" class="slide-image">
      <h2 style="margin-top:30px;" class="slide-title" [innerHTML]="slide.title">{{slide.title}}</h2>
    </ion-slide>
  </ion-slides>

  <div>
      <ion-searchbar placeholder='搜索' [(ngModel)]="searchQuery" style="padding: 0 26px;
      min-height: 55px;
      border-top: 0.55px solid transparent;
      border-bottom: 0.55px solid rgba(0, 0, 0, 0.05);
      background: rgba(243, 245, 248, 0.863);
      margin-left: -28px;
      width: 110%;
      margin-top: -15px;
      margin-bottom: 16px;
      left: 10px; 
      top: 13px; 
      height: 4rem; 
      font-size: 1.8rem;" (ionInput)="getItems($event)"></ion-searchbar>

  </div>

  <div class="task-classify" style="margin-top: 17px;margin-bottom: 17px;">

      <ion-grid>
          <ion-row>
            <ion-col>
              <button (click)="openTaskCatalog(1)" style="background-color: #fff;margin-left: 0px;max-width: 73px;">
                <ion-icon item-start name="book" style="margin-left: 0px;font-size: 40px;
                color: #367723;"></ion-icon>
                <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                  教育培训</h2>
              </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(2)" style="background-color: #fff;margin-left: 0px;max-width: 73px;">
                    <ion-icon item-start name="bicycle" style="margin-left: 0px;font-size: 40px;
                    color: #e61c7a;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      生活服务</h2>
                  </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(3)" style="background-color: #fff;margin-left:0px;max-width: 73px;">
                    <ion-icon item-start name="people" style="margin-left: 0px;font-size: 40px;
                    color: #f07a2c;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      人事咨询</h2>
                  </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(4)" style="background-color: #fff;margin-left: 0px;max-width: 73px;"> 
                    <ion-icon item-start name="heart" style="margin-left: 0px;font-size: 40px;
                    color: #d61515;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      志愿服务</h2>
                  </button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
                <button (click)="openTaskCatalog(5)" style="background-color: #fff;margin-left: 0px;max-width: 73px;">
                    <ion-icon item-start name="construct" style="margin-left: 0px;font-size: 40px;
                    color: #686664;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      工程技术</h2>
                  </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(6)" style="background-color: #fff;margin-left:0px;max-width: 73px;">
                    <ion-icon item-start name="cafe" style="margin-left: 0px;font-size: 40px;
                    color: #255797;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      营销设计</h2>
                  </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(7)" style="background-color: #fff;margin-left:0px;max-width: 73px;">
                    <ion-icon item-start name="logo-yen" style="margin-left: 0px;font-size: 40px;
                    color: #e2e61b;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      工商财税</h2>
                  </button>
            </ion-col>
            <ion-col>
                <button (click)="openTaskCatalog(8)" style="background-color: #fff;margin-left:0px;max-width: 73px;">
                    <ion-icon item-start name="briefcase" style="margin-left: 0px; font-size: 40px;
                    color: #660b8a;"></ion-icon>
                    <h2 style="font-size: 1.4rem; color: black; margin-top: 10px; font-weight:normal;">
                      其他服务</h2>
                  </button>
            </ion-col>
          </ion-row>
        </ion-grid>

  </div>

  <div class="task-segment">

    <div padding>
      <ion-segment [(ngModel)]="AboutTask">
        <ion-segment-button value="全部任务">
          全部任务
        </ion-segment-button>
        <ion-segment-button value="我的任务">
          我的任务
        </ion-segment-button>
      </ion-segment>
    </div>

    <div [ngSwitch]="AboutTask">

      <ion-list *ngSwitchCase="'我的任务'">
      <ion-item *ngFor="let task of myTask" (click)="openTaskDetailPage(task)">
      <ion-thumbnail style="width: 80px; height: 80px;" item-start>
        <img style="width: 80px; height: 80px;"  [src]="task.imageUrl">
      </ion-thumbnail>
      <h2 style="color: black;">{{task.title}}</h2>
      <p>{{task.location}}</p>
      <p>{{task.ddl}}</p>
      <ion-note style="color: #f70a0a;">{{task.pay}}</ion-note>
      <ion-badge style="margin-left: 120px; color: #fff;">{{task.state}}</ion-badge>
    </ion-item>
      </ion-list>
      
      <ion-list *ngSwitchCase="'全部任务'">
          <ion-item *ngFor="let task of allTasks" (click)="openTaskDetailPage(task)">
              <ion-thumbnail style="width: 80px; height: 80px;" item-start>
                <img style="width: 80px; height: 80px;"  [src]="'assets/imgs/1.jpg'">
              </ion-thumbnail>
              <h2 style="color: black;">{{task.missionname}}</h2>
              <p>{{task.missionaddress}}</p>
              <p>{{task.missiondeadline}}</p>
              <ion-note style="color: #f70a0a;">{{task.missionpay}}</ion-note>
              <ion-badge style="margin-left: 120px; color: #fff;">{{task.state}}</ion-badge>
            </ion-item>
      </ion-list>

    </div>

<ion-list>

</ion-list>

</div>
</ion-content>`,
  styles : ['./home.scss']
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  public AboutTask : string = '全部任务';

  myInfos;
  myTask = mockTasks;
  slide = mockSlides;
  types = [];
  allTasks;
  ans:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public missionService: missionService,
    public nav: NavController) {
      this.myInfos=navParams;  
      this.types= mockTypes;
      this.getAllTasks();
    }

    getAllTasks(){
      var message = {
        "gettasks":1
      };
      var data = JSON.stringify(message);
      console.log(data);
      var jsonObj = JSON.parse(data);//转换为json对象
      console.log(jsonObj);

      var responseMessage= this.missionService.getAllMissions(JSON.stringify(message));
      responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
        this.allTasks=JSON.parse(this.ans);
        for(var i=0;i<this.allTasks.length;i++){
          console.log(this.allTasks[i]); //取json中的值
        }
        // var jsonobj=JSON.parse(this.ans);
        // console.log(jsonobj);
      });
    }

    ionViewDidEnter(){
      this.slides.autoplayDisableOnInteraction = false;  
    }

    ionViewWillEnter(){
      this.getAllTasks();
    }
  
    ionViewDidLoad(){
      console.log('ionViewDidLoad homePage');
    }

    openTaskDetailPage(task){
      this.navCtrl.push(TaskDetailPage, { task: task,myInfo: this.myInfos });
    }

    openTaskCatalog(typeIndex){
      console.log("The typeIndex : "+typeIndex);
      this.navCtrl.push(taskTypePage,{typeIndex:typeIndex,myInfo:this.myInfos});
    }

    openAddTaskPage(){
      this.navCtrl.push(AddTaskPage,this.myInfos);
    }

    getItems(e){
      var q = e.value;

      // if (q.trim() == '') {
      //   return;
      // }
      this.myTask = this.myTask.filter((v) => {
        if (v.title.indexOf(q) > -1) {
          return true;
        }
        return false;
      })
    }
}
