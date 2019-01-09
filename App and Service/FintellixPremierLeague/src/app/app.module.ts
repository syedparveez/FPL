import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionModule } from './auction/auction.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FplService } from './shared/fpl-service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuctionModule,
    HttpClientModule
  ],
  providers: [FplService],
  bootstrap: [AppComponent]
})
export class AppModule { }
