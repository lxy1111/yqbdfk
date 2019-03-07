import { Component } from '@angular/core';

//import {  ChatPage } from '../chat/chat';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { NavController, NavParams } from 'ionic-angular';
import { GroupsPage } from '../groups/groups';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root;
  tab3Root;
  userInfo;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.userInfo=navParams;
      this.tab1Root = HomePage;
      this.tab2Root = GroupsPage;
      this.tab3Root = ContactPage;
      console.log(this.userInfo);
      console.log(typeof(this.userInfo));
    
  }

  
}
