import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { ValidateFormControlDirective } from './validate-form-control.directive';
import { ValidateFormDirective } from './validate-form.directive';
import { CustomSearchPipe } from './custom-search.pipe';



@NgModule({
  declarations: [PageNotFoundComponent, ValidateFormControlDirective, ValidateFormDirective ,CustomSearchPipe],
  imports: [
    CommonModule
  ],
  exports: [ValidateFormControlDirective, ValidateFormDirective, CustomSearchPipe]
})
export class SharedModule { }
