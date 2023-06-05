import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInforComponent } from './auth/my-infor/my-infor.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { AddCccdCmndComponent } from './auth/add-cccd-cmnd/add-cccd-cmnd.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { SupportIndexComponent } from './support/support-index/support-index.component';
import { ChatComponent } from './support/chat/chat.component';
import { WebsocketService } from './service/websocket.service';
import { WalletComponent } from './wallet/wallet.component';
import { LoanAmonutComponent } from './loan/loan-amonut/loan-amonut.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {LoadingInterceptor} from "./shared/loading.interceptor";
import { MyLoanComponent } from './loan/my-loan/my-loan.component';
import { MyPayComponent } from './loan/my-pay/my-pay.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AddMyProfileComponent } from './auth/my-profile/add-my-profile/add-my-profile.component';
import { AddMyBankComponent } from './auth/my-profile/add-my-bank/add-my-bank.component';
import { SignatureComponent } from './auth/my-profile/signature/signature.component';
import { AdditionalInforComponent } from './auth/my-profile/additional-infor/additional-infor.component';
import { SupportAdminComponent } from './support/support-admin/support-admin.component';
import { SupportUserComponent } from './support/support-user/support-user.component';
import { ModalComponent } from './auth/modal/modal.component';
import {ChatUserComponent} from "./support/chat-user/chat-user.component";
import { ModalApprovalComponent } from './home/modal-approval/modal-approval.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    MyInforComponent,
    MyProfileComponent,
    LoginComponent,
    AddCccdCmndComponent,
    SupportIndexComponent,
    ChatComponent,
    WalletComponent,
    LoanAmonutComponent,
    LoanDetailComponent,
    SpinnerComponent,
    MyLoanComponent,
    MyPayComponent,
    ChangePasswordComponent,
    AddMyProfileComponent,
    AddMyBankComponent,
    SignatureComponent,
    AdditionalInforComponent,
    SupportAdminComponent,
    SupportUserComponent,
    ModalComponent,
    ChatUserComponent,
    ModalApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
      }),
    BrowserAnimationsModule
  ],
  providers: [
    TokenService,
    AuthStateService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true
    // }
  ]
})
export class AppModule { }
