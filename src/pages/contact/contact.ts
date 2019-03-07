import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { mockTasks } from '../../mockData/mockTasks';
import { TaskDetailPage } from '../chat/chat';
import { missionService } from '../../providers/missionService';
@Component({ 
  selector: 'page-contact',
  templateUrl: 'Contact.html',
  styles: ['./contact.scss'],
})
export class ContactPage {
  public myTask;
  myCollectedTasks;
  myAppliedTask;
  public AboutMe : string = '我的信息';
  public myInfos;
  public params;
  ans;

  constructor(public navCtrl: NavController,
              public navparams:NavParams,
              public missionService:missionService) {
    this.params=navparams;
    console.log(this.params);
    console.log(this.params.get('user_id'));
    console.log(typeof(this.params));
    this.myInfos = {
      "imageUrl": 'assets/imgs/1.jpg',
      "age":this.params.get('age'),
      "phone":this.params.get('phone'),
      "name":this.params.get('realname'),
      "gender": this.params.get('gender'),
      "job": this.params.get('job'),
      "star":this.params.get('star'),
      "title":this.params.get('title'),
      "address":this.params.get('user_address')
    }
  
   // console.log(this.myInfo);
      // this.myInfo=params;
    //   console.log(this.myIn
  }

  ionViewWillEnter()
  {
    this.getMyTasks();
    this.getMyAppliedMissions();
    this.getMyCollectedTasks();
  }

  ionViewDidLoad()
  {
    this.getMyTasks();
    this.getMyAppliedMissions();
    this.getMyCollectedTasks();
  }

   

  getMyAppliedMissions()
  {
    var message={
      "userid":this.navparams.get('user_id')
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.missionService.getAppliedMissions(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
      this.myAppliedTask=JSON.parse(this.ans);
      for(var i=0;i<this.myAppliedTask.length;i++){
        console.log(this.myAppliedTask[i]); //取json中的值
        }
       // var jsonobj=JSON.parse(this.ans);

     // console.log(jsonobj);
    });

  }

  getMyCollectedTasks()
  {
    var message={
      "userid":this.navparams.get('user_id')
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.missionService.getMyCollectedMissions(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
      this.myCollectedTasks=JSON.parse(this.ans);
      for(var i=0;i<this.myCollectedTasks.length;i++){
        console.log(this.myCollectedTasks[i]); //取json中的值
        }
       // var jsonobj=JSON.parse(this.ans);

     // console.log(jsonobj);
    });

  }

  getMyTasks()
  {
    var message={
      "publisherid":this.navparams.get('user_id')
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.missionService.getMyMissions(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
      this.myTask=JSON.parse(this.ans);
      for(var i=0;i<this.myTask.length;i++){
        console.log(this.myTask[i]); //取json中的值
        }
       // var jsonobj=JSON.parse(this.ans);

     // console.log(jsonobj);
    });
  }



  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  itemTapped(event, item){
      this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  openTaskDetailPage(task) {
    this.navCtrl.push(TaskDetailPage, { task: task,myInfo:this.navparams });
  }

}

