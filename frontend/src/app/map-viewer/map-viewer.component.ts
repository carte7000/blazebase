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
      //style: 'mapbox://styles/cforand/cjnhgf9zk16wr2ss5xcsgqfhp'
      style: 'mapbox://styles/mapbox/satellite-streets-v9'
    });

    map.on('load', function () {

      map.addSource('national-park', {
        type: 'geojson',
        data: '/assets/MODIS_C6_Global_24h.geojson'
      });
      // map.addLayer({
      //   "id": "park-boundary",
      //   "type": "fill",
      //   "source": "national-park",
      //   "paint": {
      //     "fill-color": "#888888",
      //     "fill-opacity": 0.4
      //   },
      //   "filter": ["==", "$type", "Polygon"]
      // });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "layers": [
      //   {
      //     "id": "water",
      //     "source": "mapbox-streets",
      //     "source-layer": "water",
      //     "type": "fill",
      //     "paint": {
      //       "fill-color": "#00ffff"
      //     }
      //   }
      // ]
      // `

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
            0.6, "rgb(255,195,0)",
            0.7, "rgb(255,162,0)",
            0.8, "rgb(248,142,13)",
            0.9, "rgb(255,85,0)",
            1, "rgb(255,0,0)"
          ],
          // // Adjust the heatmap radius by zoom level
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 2,
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
            0, 0,
            22, 1
          ],
        }
      }, 'waterway-label');


      // map.addLayer({
      //   "id": "park-volcanoes",
      //   "type": "circle",
      //   "source": "national-park",
      //   "paint": {
      //     "circle-radius": 6,
      //     "circle-color": "#B42222"
      //   },
      //   "filter": ["==", "$type", "Point"],
      // });
    })

    // map.on('load', function () {

    //   map.addLayer({
    //     "id": "terrain-data",
    //     "type": "symbol",
    //     "source": {
    //       type: 'vector',
    //       url: '/assets/MODIS_C6_Global_24h.geojson'
    //     },
    //     "source-layer": "contour",
    //     "layout": {
    //       "line-join": "round",
    //       "line-cap": "round"
    //     },
    //     "paint": {
    //       "line-color": "#ff69b4",
    //       "line-width": 1
    //     }
    //   });
    // });

    // const runLayer = omnivore.kml('https://firms.modaps.eosdis.nasa.gov/active_fire/c6/kml/MODIS_C6_Global_24h.kml')
    //   .on('ready', function () {
    //     map.fitBounds(runLayer.getBounds());
    //   })
    //   .addTo(map);
  }
}
