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

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ReportFireComponent,
    MapViewerComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', component: ReportFireComponent },
      { path: 'map', component: MapViewerComponent }
    ]),
    BrowserModule,
    DataModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
