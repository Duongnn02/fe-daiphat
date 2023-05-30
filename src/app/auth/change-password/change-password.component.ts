import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordForm !: FormGroup;
  data: any;
  errors: any;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.changepasswordForm = this.fb.group({
      current_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  changePassword() {
    const confirmPassword = this.changepasswordForm.value.confirm_password;
    const newPassword = this.changepasswordForm.value.new_password;

    if (newPassword != confirmPassword) {
      this.toastr.error('Nhập lại mật khẩu mới không khớp với mật khẩu mới');
      return;
    }
    const data = {
      current_password: this.changepasswordForm.value.current_password,
      new_password: newPassword
    }
    this.authService.changePassword(data).subscribe(res => {

    },(error) => {
      this.errors = error.error;
      console.log(error);

    },
    () => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
