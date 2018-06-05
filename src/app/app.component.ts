import { Component, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;
  infoWindow = new google.maps.InfoWindow({});

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  markerTypes = [
    {
      text: "Parking", value: "parking_lot_maps.png"
    }
    // ,
    // {
    //   text: "Library", value: "library_maps.png"
    // },
    // {
    //   text: "Information", value: "info-i_maps.png"
    // }
  ];

  selectedMarkerType: string = "parking_lot_maps.png";

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.latitude = 18.5158;
    this.longitude = 73.9272;
    this.setCenter();
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Custome marker. Magarpatta'
    });

    //marker.content = '<div><h2>'+marker.title+'</h2><input type="button" value="get" ng-click="get(12)"/>' + '<div class="infoWindowContent">Desc</div><div class="infoWindowContent">Info</div></div>';

    let that = this;
    marker.addListener('mouseover', function(e) {
      console.log(e);
      //this.setIcon("http://www.christielakekids.com/_images/new/blue_circle.png");
      //this.infoWindow.setContent('your html content');
      //this.infoWindowContent(222222);
      that.infoWindow.setContent('<p style="padding: 0; margin-top: 10px; direction: rtl">Test Content</p>');
      that.infoWindow.open(this.map, marker);
    });

  //   google.maps.event.addListener(marker, 'click', function(){
  //     this.infoWindow.setContent('your html content');
  //     this.infoWindow.open(this.map, marker);
  //  }.bind(this));

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  showCustomMarker() {


    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    console.log(`selected marker: ${this.selectedMarkerType}`);
    
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: this.iconBase + this.selectedMarkerType,
      title: 'Got you!'
    });

  }
}
