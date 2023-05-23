import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message, Register} from "../../ts/config";
import {environment} from "../../../environments/environment";
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
  sent: any = [];

  constructor(
    private fb: FormBuilder,
    private WebsocketService: WebsocketService,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {

    this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });
    this.getMessage();

    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: environment.push.key,
      cluster:  environment.push.cluster,
      forceTLS: true
  });
  }
  handleMessage() {
    let message: Message = {
      source: '',
      message: this.messageForm.value.message,
    }
    message.source = 'localhost';
    // this.WebsocketService.handleMessage(message);

    this.sent.push(message);
    this.WebsocketService.messages.next(message);

  }
  getMessage() {

  }

}
