import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';

import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FormDebugComponent
  ],
  exports: [
    FormDebugComponent
  ],
  providers: [DropdownService]
})
export class SharedModule { }
