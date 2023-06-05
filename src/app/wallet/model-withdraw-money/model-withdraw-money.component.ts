import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-model-withdraw-money',
  templateUrl: './model-withdraw-money.component.html',
  styleUrls: ['./model-withdraw-money.component.css']
})
export class ModelWithdrawMoneyComponent implements OnInit {
  @Input() money: any;
  constructor() { }

  ngOnInit(): void {
  }

}
