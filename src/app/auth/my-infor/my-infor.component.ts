import { Component, OnInit } from '@angular/core';
import { BaseSevice } from 'src/app/base.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-infor',
  templateUrl: './my-infor.component.html',
  styleUrls: ['./my-infor.component.css']
})
export class MyInforComponent implements  OnInit {
  user: any;
  currentUser: any;
  messageCccd: string = '';
  meSuccess = 'Hoàn thành';
  constructor(private userSer: UserService) {

  }

  ngOnInit(): void {
    if (localStorage['currentUser'])
    this.user = JSON.parse(localStorage['currentUser']);
    const id  = parseInt(this.user.id);
    this.userSer.show(id).subscribe(res => {
      this.currentUser = res.user;
      if (this.currentUser.status_cmnd = 1) {
        this.messageCccd = this.meSuccess;
      }
    })
  }

}
