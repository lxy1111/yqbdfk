import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { mockGroups } from '../../mockData/mockGroups';
import { groupService } from '../../providers/groupService';
import { missionService } from '../../providers/missionService';
import { ApplicantDetailPage } from './applicantDetail';

@Component({
  selector: 'page-groups',
  templateUrl: 'applicants.html',
})
export class ApplicantPage {
  group = mockGroups;
task;
  ans;
mygroups;
applicants;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public missionService:missionService,
              public groupService:groupService) {
    this.task=navParams.data.task;
  }

  ionViewDidLoad() {
    this.getApplicants();
    console.log('ionViewDidLoad GroupsPage');
  }
  ionViewWillEnter()
  {
    this.getApplicants();
  }
getApplicants()
{
  var message={
    "missionid":this.task.mission_id
  };
  var data = JSON.stringify(message);
  console.log(data);
  var jsonObj = JSON.parse(data);//转换为json对象
   console.log(jsonObj);
 var responseMessage= this.groupService.getApplicants(JSON.stringify(message));
 responseMessage.subscribe( response => {
      console.log(response["_body"]);    
      this.ans=response["_body"];
      console.log(this.ans);
    this.applicants=JSON.parse(this.ans);
    for(var i=0;i<this.applicants.length;i++){
      console.log(this.applicants[i]); //取json中的值
      }
     // var jsonobj=JSON.parse(this.ans);

   // console.log(jsonobj);
  });

}

viewApplicantDetails(applicant)
{
    this.navCtrl.push(ApplicantDetailPage,{applicant:applicant,task:this.task})
}

}