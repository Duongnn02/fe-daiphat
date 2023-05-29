import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-support-admin',
  templateUrl: './support-admin.component.html',
  styleUrls: ['./support-admin.component.css']
})
export class SupportAdminComponent implements OnInit {
  @Input() users: any;
  messages: any;
  show: boolean = false;
  constructor(private chatService: ChatService,
  ) { }

  ngOnInit(): void {
  }
  readMessage(id: number) {
    this.chatService.readMessage(id).subscribe(res => {
      this.messages = res.message;
      this.show = true;
    })
  }

}
