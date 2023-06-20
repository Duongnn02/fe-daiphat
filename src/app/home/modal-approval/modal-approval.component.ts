import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoanService} from "../../service/loan.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-approval',
  templateUrl: './modal-approval.component.html',
  styleUrls: ['./modal-approval.component.css']
})
export class ModalApprovalComponent implements OnInit {
  @Input() loanPackage: any;
  url: any;
  constructor(private modalService: NgbModal,
  private loanService: LoanService) { }

  ngOnInit(): void {
    this.url = environment.urlImg;
  }
  closeModal() {
    this.modalService.dismissAll();
    this.loanService.viewed().subscribe();
  }
}
