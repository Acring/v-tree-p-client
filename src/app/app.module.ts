import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { PlayComponent } from './play/play.component';
import {FormsModule} from '@angular/forms';
import {EchartsNg2Module} from 'echarts-ng2';
import {HttpService} from './service/http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    PlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EchartsNg2Module,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
