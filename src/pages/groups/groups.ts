import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { mockGroups } from '../../mockData/mockGroups';
import { GroupDetailsPage } from './groupDetails';
import { AddGroupPage } from './AddGroup';
import { groupService } from '../../providers/groupService';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  group = mockGroups;
  userInfo;
ans;
mygroups;
joinedgroups;
mygroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public groupService:groupService) {
    this.userInfo=navParams;
   this.mygroup='我创建的组';
  }

  ionViewDidLoad() {
    this.getMyGroup();
    this.getJoinedGroup();
    console.log('ionViewDidLoad GroupsPage');
  }
  ionViewWillEnter()
  {
    this.getMyGroup();
    this.getJoinedGroup();
  }

  getJoinedGroup()
  {
    var message={
      "userphone":this.navParams.get('phone')
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.groupService.getJoinedGroups(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
      this.joinedgroups=JSON.parse(this.ans);
      for(var i=0;i<this.joinedgroups.length;i++){
        console.log(this.joinedgroups[i]); //取json中的值
        }
       // var jsonobj=JSON.parse(this.ans);

     // console.log(jsonobj);
    });

  }

  getMyGroup()
  {
    var message={
      "userid":this.navParams.get('user_id')
    };
    var data = JSON.stringify(message);
    console.log(data);
    var jsonObj = JSON.parse(data);//转换为json对象
     console.log(jsonObj);
   var responseMessage= this.groupService.getMyGroups(JSON.stringify(message));
   responseMessage.subscribe( response => {
        console.log(response["_body"]);    
        this.ans=response["_body"];
        console.log(this.ans);
      this.mygroups=JSON.parse(this.ans);
      for(var i=0;i<this.mygroups.length;i++){
        console.log(this.mygroups[i]); //取json中的值
        }
       // var jsonobj=JSON.parse(this.ans);

     // console.log(jsonobj);
    });
  }

  viewGroupDetails(group) {
    this.navCtrl.push(GroupDetailsPage,{group:group,userid:this.userInfo});
  }

  openAddGroupPage()
  {
    this.navCtrl.push(AddGroupPage,this.userInfo);
  }

  deleteGroup(group){
     
  }

}