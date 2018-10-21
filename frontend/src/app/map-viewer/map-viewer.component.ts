import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
declare var require: any;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
declare var omnivore: any;
declare var L: any;

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMapbox();
  }

  initMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2ZvcmFuZCIsImEiOiJjam5oZmNrZmswNzY3M3Byczg4cmlkbHB4In0.mJGkFKq1OLdz1Ps7STPPUA'//'pk.eyJ1IjoiY2FydGU3MDAwIiwiYSI6ImNpbmdsZm41ZzA1d2l1a2x5aG13cGR3dXMifQ.4xGvifRUQjT1DBctXy2lwA';
    const map = new mapboxgl.Map({
      container: 'map-container',
      // style: 'mapbox://styles/cforand/cjnhgf9zk16wr2ss5xcsgqfhp'
      style: 'mapbox://styles/mapbox/satellite-streets-v9'
    });

    map.on('load', function () {
      map.addSource('national-park', {
        type: 'geojson',

        data: '/assets/test.geojson'
      });

      map.addLayer({
        "id": "earthquakes-heat",
        "type": "heatmap",
        "source": "national-park",
        "paint": {

          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(8,8,253,0)",
            0.8, "rgba(255,195,0,1)",
            0.85, "rgba(255,162,0,1)",
            0.9, "rgba(248,142,13,1)",
            0.95, "rgba(255,85,0,1)",
            1, "rgba(255,0,0,1)"
          ],
          // // Adjust the heatmap radius by zoom level
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 1.5,
            1, 5,
            2, 7,
            3, 8,
            4, 9,
            5, 10,
            10, 50
          ],
          // // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 0.6,
            1, 0.65,
            2, 0.7,
            3, 0.75,
            4, 0.8,
            5, 0.85,
            6, 0.9,
            7, 0.95,
            8, 1,
            9, 1,
            10, 1
          ],
        }
      }, 'waterway-label');
    })
  }
}
