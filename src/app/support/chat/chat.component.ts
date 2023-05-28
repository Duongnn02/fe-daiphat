import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() messageUser: any;
  @Input() userId: number = 0;
  @Output() backEmit = new EventEmitter<boolean>();
  messages: any[] = [];
  errors: any;
  messageForm !: FormGroup;
  received: any = [];
  sent: any[] = [];
  data: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage['currentUser']);
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
        this.messageUser.push(res.message);
        console.log('Chat Event Data : ', this.messageUser);
      });


  }
  handleMessage(id: any) {
    let message: Message = {
      message: this.messageForm.value.message,
      to_user: id || Enum.IS_ADMIN
    }

    this.chatService.sendMessage(message).subscribe(res => {
      this.data = res;
      if (this.data.status == Enum.SUCCESS) {
        this.messageForm.reset();
      }
    });

  }
  getMessage() {
    if (this.messageUser == '') {
      this.chatService.readMessage(this.user.id).subscribe(res => {
        this.messageUser = res.message;
        console.log(this.messageUser);

      })
    }
  }
  back() {
    this.show = true;
    console.log(123);

    this.backEmit.emit(this.show);
  }
}
