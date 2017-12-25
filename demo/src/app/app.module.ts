import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DragDropListModule } from 'ng-drag-drop-list/dist/drag-drop-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragDropListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
