import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Enum, Message, Register } from "../../ts/config";
import { environment } from "../../../environments/environment";
import { ChatService } from 'src/app/service/chat.service';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  @Input() messageUser: any;
  @Output() backEmit = new EventEmitter<boolean>();

  messages: any[] = [];
  messageForm !: FormGroup;
  data: any;
  user: any;
  image: any;
  file: any;
  url = environment.urlImg;
  show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage['currentUser']);

    this.messageForm = this.fb.group({
      message: [''],
      photo: [''],
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
  get isButtonDisabled(): boolean {
    // @ts-ignore
    return !(this.messageForm.get('message').value || this.messageForm.get('photo').value);
  }
  handleMessage() {
    let message: Message = {
      message: this.messageForm.value.message,
      to_user: Enum.IS_ADMIN,
      photo: this.messageForm.value.photo
    }

    this.chatService.sendMessage(message).subscribe(res => {
      this.data = res;
      if (this.data.status == Enum.SUCCESS) {
        this.messageForm.reset();
        this.removeImage();
      }
    });

  }
  getMessage() {
    if (this.messageUser == '') {
      this.chatService.readMessage(this.user.id).subscribe(res => {
        this.messageUser = res.message;
      })
    }
  }
  goBack() {
    this.backEmit.emit(this.show);
  }
  sendImage(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';
    this.messageForm.patchValue({
      photo: this.file
    });

    this.messageForm.get('photo')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(this.file);

  }
  removeImage() {
    this.file = undefined;
    this.image = undefined;
    this.messageForm.patchValue({
      image: ''
    });
  }
}
