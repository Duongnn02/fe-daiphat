import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message, Register} from "../../ts/config";
import {UserService} from "../../service/user.service";
import {AuthStateService} from "../../shared/auth-state.service";
import {environment} from "../../../environments/environment";
import {ChatService} from "../../service/chat.service";
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

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private authState: AuthStateService,

  ) { }

  ngOnInit(): void {
    this.chatService.subscribeToChannel('chat', 'App\\Events\\Message', (data: any) => {
      this.messages.push(data.message);
    });

    this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });
    this.getMessage();
  }
  handleMessage() {
    let data: Message = {
      message: this.messageForm.value.message,
    }
    this.chatService.sendMessage(data).subscribe(res => {
    },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.messageForm.reset();
      });
  }
  getMessage() {
    this.chatService.getMessage().subscribe(res => {
        this.messages = res;
    })
  }

}
