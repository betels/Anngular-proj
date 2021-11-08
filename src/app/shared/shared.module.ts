import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlaceHolderDirective } from '../place-holder.directive';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceHolderDirective
    ],
    imports:[
    CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceHolderDirective,
        CommonModule

    ]

})
export class SharedModule{

}