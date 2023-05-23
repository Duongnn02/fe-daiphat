// src\app\services\websocket.service.ts
import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from "../ts/config";
import { ChatService } from "./chat.service";

const CHAT_URL = "ws://localhost:8000/app/chat-channel";


@Injectable()
export class WebsocketService {
    private subject!: AnonymousSubject<MessageEvent>;
    public messages: Subject<Message>;

    constructor(
      private chatService: ChatService
      ) {
        this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

    public connect(url: any): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url: any): AnonymousSubject<MessageEvent> {
      let ws = new WebSocket(url);
      let observable = new Observable((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return () => ws.close();
      });
      let observer: Observer<MessageEvent> = {
        error: (err: any) => {
          console.error('WebSocket error:', err);
        },
        complete: () => {
          console.log('WebSocket connection closed.');
        },
        next: (data: Object) => {
          console.log('Message sent to WebSocket:', data);
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        },
      };
      return new AnonymousSubject<MessageEvent>(observer, observable);
    }

    public handleMessage(message: Message) {
      this.chatService.sendMessage(message).subscribe(res => {
        console.log(res);

      }
      );
    }
}
