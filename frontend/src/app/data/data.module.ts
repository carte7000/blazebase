import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: []
})
export class DataModule { }
