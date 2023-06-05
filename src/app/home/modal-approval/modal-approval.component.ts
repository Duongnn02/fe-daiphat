import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoanService} from "../../service/loan.service";

@Component({
  selector: 'app-modal-approval',
  templateUrl: './modal-approval.component.html',
  styleUrls: ['./modal-approval.component.css']
})
export class ModalApprovalComponent implements OnInit {
  @Input() message: any;
  constructor(private modalService: NgbModal,
  private loanService: LoanService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll();
    this.loanService.viewed().subscribe();
  }
}
