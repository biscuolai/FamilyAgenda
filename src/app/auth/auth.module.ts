import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './auth.service';

import { MatFormFieldModule, MatTabsModule, MatButtonModule, MatInputModule, MatListModule } from '@angular/material';


@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
    ],
    imports: [ 
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatTabsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        FlexLayoutModule
    ],
    exports: [],
    providers: [
        AuthService
    ],
})
export class AuthModule {}