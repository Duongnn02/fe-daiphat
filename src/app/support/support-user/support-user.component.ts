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
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
  openChat() {
    this.show = true;
  }
  readMessage(id: number) {
    this.chatService.readMessage(id).subscribe(res => {
      this.messages = res.message;
    })
  }
}
