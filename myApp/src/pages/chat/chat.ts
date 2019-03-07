// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
// @Component({
//   selector: 'page-chat',
//   templateUrl: 'chat.html',
// })
// export class ChatPage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad ChatPage');
//   }

// }

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  // mock 数据
  chats = [{
    id: '001',
    imageUrl: 'assets/imgs/1.jpg',
    title: 'Cathy Zhang',
    lastMessage: 'What happened?',
    timestamp: new Date()
  },
    {
      id: '002',
      imageUrl: 'assets/imgs/2.jpg',
      title: 'Lucy Zheng',
      lastMessage: 'If you have any question,please ask me...',
      timestamp: new Date()
    },
    {
      id: '003',
      imageUrl: 'assets/imgs/3.jpg',
      title: 'Kelly Zhou',
      lastMessage: 'And you?',
      timestamp: new Date()
    }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

 // 界面跳转并且传值
  viewMessages(chat) {
    this.navCtrl.push('ChatMessagePage', {chatId: chat.id});
  }

}