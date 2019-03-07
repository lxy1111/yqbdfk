import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { mockGroups } from '../../mockData/mockGroups';
import { groupService } from '../../providers/groupService';
import { missionService } from '../../providers/missionService';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-groups',
  templateUrl: 'applicantDetail.html',
})
export class ApplicantDetailPage {
  group = mockGroups;
task;
  ans;
mygroups;
applicant;
appliedreason;
experience;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public missionService:missionService,
              public groupService:groupService) {
    this.applicant=navParams.data.applicant;
    this.task=navParams.data.task;
  }

  ionViewDidLoad() {
    this.getApplyReason();
    this.getExperience();
    console.log('ionViewDidLoad GroupsPage');
  }

  showSuccess() {
    const alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '已通过',
      buttons: ['确认']
    });
    alert.present();
  }


  ionViewWillEnter()
  {
    this.getApplyReason();
    this.getExperience();
  }

   passApplicants()
   {
    var message={
      "userid":this.applicant.user_id,
      "missionid":this.task.mission_id
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.missionService.passApplicants(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
        if(this.ans=="true")
         this.showSuccess();
         this.navCtrl.pop();
        
       // var jsonobj=JSON.parse(this.ans);
     // console.log(jsonobj);
    });
   }

getApplyReason()
{
  var message={
    "userid":this.applicant.user_id,
    "missionid":this.task.mission_id
  };
  var data = JSON.stringify(message);
  console.log(data);
  var jsonObj = JSON.parse(data);//转换为json对象
   console.log(jsonObj);
 var responseMessage= this.missionService.getAppliedReason(JSON.stringify(message));
 responseMessage.subscribe( response => {
      console.log(response["_body"]);    
      this.ans=response["_body"];
      console.log(this.ans);
    this.appliedreason=this.ans;
   
     // var jsonobj=JSON.parse(this.ans);

   // console.log(jsonobj);
  });

}

getExperience()
{
  var message={
    "userid":this.applicant.user_id,
    "missionid":this.task.mission_id
  };
  var data = JSON.stringify(message);
  console.log(data);
  var jsonObj = JSON.parse(data);//转换为json对象
   console.log(jsonObj);
 var responseMessage= this.missionService.getExperience(JSON.stringify(message));
 responseMessage.subscribe( response => {
      console.log(response["_body"]);    
      this.ans=response["_body"];
      console.log(this.ans);
    this.experience=this.ans;
   
     // var jsonobj=JSON.parse(this.ans);

   // console.log(jsonobj);
  });

}



}