import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [SharedModule, CommonModule, LoginRoutingModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
