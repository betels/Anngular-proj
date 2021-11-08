
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SchoppingEditComponent } from './schopping-edit/schopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations:[
        ShoppingListComponent,
        SchoppingEditComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            {path:'', component:ShoppingListComponent},
        ])
    ]
})
export class ShoppingListModule{
    
}