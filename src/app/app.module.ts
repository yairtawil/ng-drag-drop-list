import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DragDropListModule } from 'ng-drag-drop-list';
import { MatToolbarModule, MatTabsModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DragDropListModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
