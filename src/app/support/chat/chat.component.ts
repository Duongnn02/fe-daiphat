import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Enum, Message, Register } from "../../ts/config";
import { environment } from "../../../environments/environment";
import { WebsocketService } from 'src/app/service/websocket.service';
import { ChatService } from 'src/app/service/chat.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input()
  show!: boolean;
  messages: any = [];
  errors: any;
  messageForm !: FormGroup;
  received: any = [];
  sent: any[] = [];
  data: any;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {

    this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });
    this.getMessage();

    const echo = new Echo({
      broadcaster: 'pusher',
      key: environment.push.key,
      cluster: environment.push.cluster,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
    echo.channel('chat')
      .listen('SendMessage', (res: any) => {
        this.sent.push(res.message);
        console.log('Chat Event Data : ', this.sent);
      });
  }
  handleMessage() {
    let message: Message = {
      message: this.messageForm.value.message,
    }
    this.chatService.sendMessage(message).subscribe(res => {
      this.data = res;
      if (this.data.status == Enum.SUCCESS)
      this.messageForm.reset();
    });

  }
  getMessage() {
    this.chatService.getMessage().subscribe(res => {
      this.sent = res;
    })
  }

}
