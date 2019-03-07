import { FormBuilder } from '@angular/forms';
import {Component,ViewChild} from '@angular/core';
import {IonicPage, NavController, Content ,NavParams} from 'ionic-angular';
import { mockTasks } from '../../mockData/mockTasks';

@IonicPage()
@Component({
  selector: 'page-TaskDetail',
  templateUrl: 'TaskDetail.html',
  styles: ['./TaskDetail.scss'],
})

export class TaskDetailPage {
  
@ViewChild(Content) content: Content;
public task;
constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public formBuilder: FormBuilder) {
                this.task=navParams.data.task;
            }

}

@Component({
    template: 'chat.html'
  })

export class BasicPage {
    tasks = [];
  
    constructor(public nav: NavController) {
      this.tasks = mockTasks;
    }
  
    openTaskDetailPage(task) {
      this.nav.push(TaskDetailPage, { task: task });
    }
  
  }
