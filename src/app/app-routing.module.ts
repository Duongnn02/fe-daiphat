import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { MyInforComponent } from './auth/my-infor/my-infor.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard ';
import { AuthGuard_1 } from './auth/auth.guard _1';
import { AddCccdCmndComponent } from './auth/add-cccd-cmnd/add-cccd-cmnd.component';
import { SupportIndexComponent } from './support/support-index/support-index.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoanAmonutComponent } from './loan/loan-amonut/loan-amonut.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { AuthGuard_loan } from './auth/auth.guard _loan';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AuthGuard_1]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthGuard_1]
  },
  {
    path: 'thong-tin-cua-toi', component: MyInforComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trang-ca-nhan', component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'cccd-cmnd', component: AddCccdCmndComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'support', component: SupportIndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vi-tien', component: WalletComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'khoan-vay', component: LoanAmonutComponent,
    canActivate: [AuthGuard_loan]
  },
  {
    path: 'chi-tiet-khoan-vay', component: LoanDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
