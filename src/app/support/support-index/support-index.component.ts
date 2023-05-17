import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.css']
})
export class SupportIndexComponent implements OnInit {

  constructor() { }
  show: boolean = false;
  ngOnInit(): void {
  }

  openChat() {
    this.show = true;
  }

}
