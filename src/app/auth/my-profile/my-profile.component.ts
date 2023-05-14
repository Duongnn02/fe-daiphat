import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private _Router: Router,) { }

  ngOnInit() {}
  logout(){
    localStorage.removeItem('currentUser');
    let data = localStorage.getItem('currentUser');
    if (data == null) {
      this._Router.navigate(['/login']);
    }
  }

}
