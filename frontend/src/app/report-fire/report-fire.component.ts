import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UploadService } from '../data/upload.service';

@Component({
  selector: 'app-report-fire',
  templateUrl: './report-fire.component.html',
  styleUrls: ['./report-fire.component.css']
})
export class ReportFireComponent implements OnInit {

  constructor(
    private upload: UploadService,
  ) {
  }

  trigger = new Subject();

  async click() {
    const position = await this.getLocation();
    this.trigger.next();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => { resolve(position); });
      } else {
      }
    });
  }

  async image(event) {
    const position = await this.getLocation();
    const doc = await this.upload.createDocument(position as Position, event.imageAsDataUrl);
    // const test = await this.upload.upload(`${doc.id}.dataUrl`, event.imageAsDataUrl);
    // console.log(test);
    console.log(event);
  }

  ngOnInit() {
  }

}
