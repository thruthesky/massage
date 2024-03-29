import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';

import { NoticeModalContent } from '../components/modals/notice/notice';

import { PhilgoApiModule } from './../api/philgo-api/v2/philgo-api-module';
import { PageScroll } from './../providers/page-scroll';
const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: '', component: HomePage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    NoticeModalContent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot( appRoutes, { useHash: !history.pushState }),
    NgbModule.forRoot(),
    PhilgoApiModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ NgbActiveModal, PageScroll ],
  entryComponents: [ NoticeModalContent ]
})
export class AppModule {}


