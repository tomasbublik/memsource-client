import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ProjectsComponent} from './projects/projects.component';
import {MemsourceService} from './memsource.service';
import {ApplicationState} from './application.state.service';
import {LoginComponent} from './login/login.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ProjectsComponent,
    LoginComponent,
    AppComponent,
  ],
  providers: [MemsourceService, ApplicationState, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
