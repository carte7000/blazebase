import { Component, OnInit } from '@angular/core';
declare var require: any;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  initMapbox() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydGU3MDAwIiwiYSI6ImNpbmdsZm41ZzA1d2l1a2x5aG13cGR3dXMifQ.4xGvifRUQjT1DBctXy2lwA';
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
  }

}
