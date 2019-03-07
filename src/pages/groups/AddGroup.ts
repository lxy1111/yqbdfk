import { Component } from '@angular/core';
import { NavController,NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { missionService } from '../../providers/missionService';
import { mockTypes } from '../../mockData/mockTypes';
import { groupService } from '../../providers/groupService';

@Component({
    selector: 'page-AddGroup',
    templateUrl: 'AddGroup.html',
    styles: ['./AddGroup.scss'],
  })
  export class AddGroupPage {

    ans;
    userInfo;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
         public groupService: groupService){
           this.userInfo=navParams;
         }


         showSuccess() {
            const alert = this.alertCtrl.create({
              title: '创建成功',
              subTitle: '您可以到群组查看',
              buttons: ['确认']
            });
            alert.present();
          }
        
         showAlert() {
            const alert = this.alertCtrl.create({
              title: '错误提示',
              subTitle: '请完善群组信息',
              buttons: ['确认']
            });
            alert.present();
          }

         addGroup(title,introduction){
            if(!title&&!introduction)
              {  
                  this.showAlert();
                  return;
              }
            var groupInfo={
                "creatorid":this.userInfo.get("user_id"),
                "groupname":title,
                "groupintroduction":introduction
              }
        
             var responseMessage=this.groupService.addGroup(JSON.stringify(groupInfo));
             responseMessage.subscribe( response => {
                 console.log(response._body);
                 console.log(typeof(response["_body"]));     
                this.ans=response["_body"];
                console.log(this.ans);
             });
               this.showSuccess();
               this.navCtrl.pop();
            //this.navCtrl.push(TabsPage);
          }

}