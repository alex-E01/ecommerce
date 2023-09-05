import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MycomponentComponent} from 'src/app/mycomponent/mycomponent.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
initializeApp(environment.firebaseConfig)


@NgModule({
  declarations: [AppComponent,MycomponentComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
