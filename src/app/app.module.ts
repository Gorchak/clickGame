import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { FieldComponent } from './components/field/field.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import { ArrNumbersPipe } from './pipes/arr-numbers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderBoardComponent,
    FieldComponent,
    ArrNumbersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
