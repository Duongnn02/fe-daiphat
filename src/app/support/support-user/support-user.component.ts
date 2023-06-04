import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-support-user',
  templateUrl: './support-user.component.html',
  styleUrls: ['./support-user.component.css']
})
export class SupportUserComponent implements OnInit {
  show:boolean = false;
  messages: any;
  user: any;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.readMessage();
  }
  openChat() {
    this.show = true;
  }
  readMessage() {
    this.chatService.readMessage(this.user.id).subscribe(res => {
      this.messages = res.message;
    })
  }
}
