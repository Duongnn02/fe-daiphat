import { Component, OnInit } from '@angular/core';
import {Enum} from "../../ts/config";
import {ChatService} from "../../service/chat.service";

@Component({
  selector: 'app-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.css']
})
export class SupportIndexComponent implements OnInit {

  constructor(
    private chatService: ChatService,
  ) { }
  show: boolean = false;
  isAdmin: any;
  data: any = [];
  users: any = [];
  messages: any = [];
  checkRole: boolean = false;
  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser') || '{}');

    console.log(this.isAdmin.role_id)
    if (this.isAdmin.role_id == Enum.IS_ADMIN) {
      this.checkRole = true;
      this.getMessage();
    }
  }

  openChat() {
    this.show = true;
    this.checkRole = false;
  }
  getMessage() {
    this.chatService.getMessage().subscribe(res => {
      this.data = res;
      this.users = this.data.users
    })
  }
  readMessage(id: number) {
    this.chatService.readMessage(id).subscribe(res => {
      this.messages = res.message;
      this.show = true;

      console.log(this.messages)
    })
  }

}
