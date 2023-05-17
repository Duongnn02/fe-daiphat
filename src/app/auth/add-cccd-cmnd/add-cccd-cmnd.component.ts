import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseSevice } from 'src/app/base.component';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { InforCccd } from 'src/app/ts/config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-cccd-cmnd',
  templateUrl: './add-cccd-cmnd.component.html',
  styleUrls: ['./add-cccd-cmnd.component.css']
})
export class AddCccdCmndComponent implements OnInit {
  addCccdForm!: FormGroup;
  data: any;
  before: any;
  after: any;
  face: any;
  imageURL: string = '';
  mesage: string = '';
  item: any;
  submitted = false;
  user: any;
  currentUser: any;
  name: any;
  cccd: any;
  imageBf: any;
  imageAt: any;
  imageFace: any;
  disable: boolean = false;
  file:any;
  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private userSer: UserService) {
  }

  ngOnInit(): void {
    this.addCccdForm = this.fb.group({
      name: ['', [Validators.required]],
      cccd_cmnd: ['', [Validators.required]],
      before_cccd_cmnd: ['', [Validators.required]],
      after_cccd_cmnd: ['', [Validators.required]],
      face_cccd_cmnd: ['', [Validators.required]],
    });
    if (localStorage['currentUser'])
      this.user = JSON.parse(localStorage['currentUser']);
      const id = parseInt(this.user.id);
      this.userSer.show(id).subscribe(res => {
      this.currentUser = res.user;
      this.name = this.currentUser.name;
      this.cccd = this.currentUser.cccd_cmnd;
      this.imageBf = this.currentUser.before_cccd_cmnd ?  environment.urlImg + this.currentUser.before_cccd_cmnd : '';
      this.imageAt = this.currentUser.after_cccd_cmnd ? environment.urlImg + this.currentUser.after_cccd_cmnd : '';
      this.imageFace = this.currentUser.face_cccd_cmnd ? environment.urlImg + this.currentUser.face_cccd_cmnd : '';
      if (this.name) {
        this.addFormControl['name'].disable();
        this.disable = true;
      }
      if (this.cccd) {
        this.addFormControl['cccd_cmnd'].disable();
      }
    });
  }
  get addFormControl() {
    return this.addCccdForm.controls;
  }
  uploadBFCccd(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      before_cccd_cmnd: this.file
    });

    this.addCccdForm.get('before_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.before = reader.result as string;
    }
    reader.readAsDataURL(this.file);

  }
  uploadATCccd(event: any) {
    const file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      after_cccd_cmnd: file
    });

    this.addCccdForm.get('after_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.after = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
  uploadFace(event: any) {
    const file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      face_cccd_cmnd: file
    });

    this.addCccdForm.get('face_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.face = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
  addCccd() {
    this.submitted = true;
    let cccd: InforCccd = {
      name: this.addCccdForm.value.name,
      cccd_cmnd: this.addCccdForm.value.cccd_cmnd,
      before_cccd_cmnd: this.addCccdForm.value.before_cccd_cmnd,
      after_cccd_cmnd: this.addCccdForm.value.after_cccd_cmnd,
      face_cccd_cmnd: this.addCccdForm.value.face_cccd_cmnd
    }
    this.data = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.authSer.uploadCccd(cccd, this.data.id).subscribe(res => {
      this.item = res;
    }, err => {
      console.log(err);
      alert("Cập nhập thất bại");
    });

  }



}
