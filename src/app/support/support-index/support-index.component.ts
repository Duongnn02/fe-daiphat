import { Component, OnInit } from '@angular/core';
import { Enum } from "../../ts/config";
import { ChatService } from "../../service/chat.service";

@Component({
  selector: 'app-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.css']
})
export class SupportIndexComponent implements OnInit {

  constructor(
    private chatService: ChatService,
  ) {
  }

  show: boolean = false;
  isAdmin: any;
  data: any = [];
  users: any = [];
  messages: any = [];
  userId: number = 0;
  checkRole: boolean = false;

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.getUser();

  }



  getUser() {
    if (this.isAdmin.role_id == Enum.IS_ADMIN) {
      this.chatService.getMessage().subscribe(res => {
        this.data = res;
        this.checkRole = true;
        this.users = this.data.users
      })
    }
  }



  back() {
    this.show = true;

  }

}
