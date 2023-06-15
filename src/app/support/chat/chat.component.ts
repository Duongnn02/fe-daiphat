import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Enum, Message, Register } from "../../ts/config";
import { environment } from "../../../environments/environment";
import { ChatService } from 'src/app/service/chat.service';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() messageUser: any;
  @Input() user: any;
  @Input() userId: number = 0;
  @Output() backEmit = new EventEmitter<boolean>();
  messages: any[] = [];
  errors: any;
  messageForm !: FormGroup;
  data: any;
  image: any;
  file: any;
  show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
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
  handleMessage() {
    let message: Message = {
      message: this.messageForm.value.message,
      to_user: this.user.id
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
      })
    }
  }
  goBack() {
    this.backEmit.emit(this.show);
  }
  sendImage(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';
    console.log(this.file)
    this.messageForm.patchValue({
      image: this.file
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
