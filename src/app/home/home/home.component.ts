import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userSer: UserService
    ) { }
  button:any;
  token:any;
  data: any;
  runIndex: any;
  minMoney = 30000000;
  maxMoney = 1000000000;
  max = 10000;
  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.button = 'Hồ sơ'

    this.userSer.fakerData().subscribe(res => {
      this.data = res;
      if (this.data) {
        this.autoPlay();
      }
    })
  }
  autoPlay() {
    for (let index = 0; index <= this.max; index++) {
      setTimeout((y) => {
          this.runIndex = y;
          if (index == this.max) {
            this.autoPlay();
          }
      }, index * 100, index);
    }

  }
  redrect(){
    if (this.token) {
      this.router.navigate(['/trang-ca-nhan']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
