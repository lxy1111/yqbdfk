import {Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { mockGroups } from '../../mockData/mockGroups';
import { groupService } from '../../providers/groupService';
import { userService } from '../../providers/userService';

@Component({
  templateUrl: 'groupDetails.html',
  styles: ['./groupDetails.scss']
})

export class GroupDetailsPage {

//@ViewChild(Content) content: Content;
group = mockGroups;
mygroup;
clickadd;
ans;
groupmembers;


constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public alertCtrl:AlertController,
            public groupService:groupService,
            public userService:userService,
            public formBuilder: FormBuilder) {
                this.mygroup=navParams.data.group;
                this.clickadd=false;
            }
            ionViewWillEnter()
            {
              this.getGroupMember();
            }

            getGroupMember()
            {
              var message={
                "groupid":this.mygroup.groupid
              };
              var data = JSON.stringify(message);
              console.log(data);
              var jsonObj = JSON.parse(data);//转换为json对象
               console.log(jsonObj);
             var responseMessage= this.userService.getGroupMembers(JSON.stringify(message));
             responseMessage.subscribe( response => {
                  console.log(response["_body"]);    
                  this.ans=response["_body"];
                  console.log(this.ans);
                this.groupmembers=JSON.parse(this.ans);
                for(var i=0;i<this.groupmembers.length;i++){
                  console.log(this.groupmembers[i]); //取json中的值
                  }
                 // var jsonobj=JSON.parse(this.ans);
          
               // console.log(jsonobj);
              });

            }


    
            changestatus(){
              if(this.clickadd==true)
                 this.clickadd=false;
              else
              this.clickadd=true;
            }

            showAlert() {
              const alert = this.alertCtrl.create({
                title: '错误提示',
                subTitle: '请输入成员手机号',
                buttons: ['确认']
              });
              alert.present();
            }

            
  showSuccess() {
    const alert = this.alertCtrl.create({
      title: '添加成功',
      subTitle: '添加成功',
      buttons: ['确认']
    });
    alert.present();
  }


            addMember(memberphone)
            {
              if(!memberphone)
              {  this.showAlert();
                  return;
              }
        
            var mission={
               "userphone":memberphone,
               "groupid":this.mygroup.groupid
              }
        
             var responseMessage=this.groupService.addMember(JSON.stringify(mission));
             responseMessage.subscribe( response => {
             // console.log(response["_body"]);
              //console.log(JSON.parse(response._body));
                 console.log(response._body);
                 console.log(typeof(response["_body"]));     
                this.ans=response["_body"];
                console.log(this.ans);
                //  this.userInfo=JSON.parse(this.ans);
                //     console.log(this.userInfo['user_id']);
                //     console.log(typeof(this.userInfo));
                //     this.navCtrl.push(TabsPage,this.userInfo);
             });
               this.showSuccess();
               this.navCtrl.pop();


            }
        


   


}