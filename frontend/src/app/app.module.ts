import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DataModule } from './data/data.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { ReportFireComponent } from './report-fire/report-fire.component';
import { RouterModule } from '@angular/router';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { WebcamModule } from 'ngx-webcam';
import { UploadService } from './data/upload.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FireListComponent } from './fire-list/fire-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ReportFireComponent,
    MapViewerComponent,
    FireListComponent,
  ],
  imports: [
    WebcamModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: 'fire-list', component: FireListComponent },
      { path: 'map-viewer', component: MapViewerComponent },
      { path: '', component: AboutPageComponent },
      { path: 'report', component: ReportFireComponent }
    ]),
    BrowserModule,
    DataModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
