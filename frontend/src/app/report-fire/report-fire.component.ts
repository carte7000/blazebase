import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-fire',
  templateUrl: './report-fire.component.html',
  styleUrls: ['./report-fire.component.css']
})
export class ReportFireComponent implements OnInit {


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

  image(event) {
    console.log(event);
  }

  constructor() { }

  ngOnInit() {
  }

}
