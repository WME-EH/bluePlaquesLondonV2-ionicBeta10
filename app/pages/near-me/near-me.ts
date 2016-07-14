import {Component} from '@angular/core';
import {NavController, Toast, ViewController} from 'ionic-angular';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {DataService, Plaque} from '../../providers/data-service/data-service';
import {GOOGLE_MAPS_DIRECTIVES, InfoWindowManager} from 'angular2-google-maps/core';
import {PlaqueDetailsPage} from '../plaque-details/plaque-details';


@Component({
	selector: 'map',
  	templateUrl: 'build/pages/near-me/near-me.html',
  	directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class NearMePage {
	title: string = 'Google maps in ionic';
	lat: number = 51.504110;
	lng: number = -0.144631;
	map: any;
	mapInitialised: any = false;
	apiKey: any;
	plaques: Plaque[];
	markers = [];
	plaqueData = [];
	infowindow: any;
	bluePlaquesPin: string = 'build/assets/img/icons/blue-plaques-pin.svg';


	constructor(private nav: NavController, public dataService: DataService, private connectivityService: ConnectivityService, public viewCtrl: ViewController) {
		// this.loadGoogleMaps();
		this.nav = nav;
		this.loadPlaques();
	}



	private loadPlaques() {
		let toast = Toast.create({ 
			message: 'Loading blue plaque data...',
			position: 'bottom'
		});
		this.plaques = [];
		this.nav.present(toast);
		this.dataService.getPlaques().then(data => {
			console.log("Data service results ->")
			console.log(data);
			for (let i = 0; i <= (data.length - 1); i++) {
				this.plaqueData.push(data[i]);
			}
			console.log(this.plaqueData);
		}).then(() => {
			toast.dismiss();
		});
	}

	private plaqueInfo(id) {
		console.log(id);
		this.nav.push(PlaqueDetailsPage, { plaqueID: id });
	}

	// loadGoogleMaps() {
	// 	this.addConnectivityListeners();

	// 	if (typeof google == "undefined" || typeof google.maps == "undefined") {
	// 		console.log("Google maps Javascript needs to be loaded");
	// 		this.disableMap();

	// 		if (this.connectivityService.isOnline()) {
	// 			console.log("online, loading map");

	// 			window.mapInit = () => {
	// 				this.initMap();
	// 				this.enableMap();
	// 			}
	// 		}

	// 		let script = document.createElement("script");
	// 		script.id = "googleMaps";

	// 		if (this.apiKey) {
	// 			script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
	// 		} else {
	// 			script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
	// 		}

	// 		document.body.appendChild(script);

	// 		this.loadPlaques();

	// 	} else {
	// 		if (this.connectivityService.isOnline()) {
	// 			console.log("showing map");
	// 			this.initMap();
	// 			this.enableMap();
	// 			this.loadPlaques();
	// 		} else {
	// 			console.log("disabling map");
	// 			this.disableMap();
	// 		}
	// 	}
	// }

	// initMap() {
	// 	navigator.geolocation.getCurrentPosition((position) => {
	// 		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// 		let mapOtions = {
	// 			center: latLng,
	// 			zoom: 15,
	// 			icon: {
	// 				path: (position.coords.heading) ? google.maps.SymbolPath.FORWARD_CLOSED_ARROW : google.maps.SymbolPath.CIRCLE,
	// 				scale: (position.coords.heading) ? 7 : 10,
	// 				rotation: position.coords.heading,
	// 				fillColor: "#ef4823",
	// 				fillOpacity: 1,
	// 				strokeColor: "white",
	// 				strokeOpacity: 1,
	// 				strokeWeight: 2
 //                },
 //                zoomControl: true,
	// 			mapTypeControl: false,
	// 			scaleControl: false,
	// 			streetViewControl: false
	// 		}
	// 		console.log(position);

	// 			this.map = new google.maps.Map(document.getElementById("map"), mapOtions);


	// 	}, (error) => {
	// 		console.log(error);
	// 	})
	// }

	// disableMap() {
	// 	console.log("disable map");
	// }

	// enableMap() {
	// 	console.log("enable map");
	// }

	// addConnectivityListeners() {
	// 	var me = this;
	// 	var onOnline = () => {
	// 		if (typeof google == "undefined" || typeof google.maps == "undefined") {
	// 			this.loadGoogleMaps();
	// 		} else {
	// 			if (!this.mapInitialised) {
	// 				this.initMap();
	// 			}
	// 			this.enableMap();
	// 		}
	// 	};

	// 	var onOffline = () => {
	// 		this.disableMap();
	// 	};

	// 	document.addEventListener('online', onOnline, false);
	// 	document.addEventListener('offline', onOffline, false);
	// }

	// addPlaqueMarkers() {

	// 	this.plaqueData.map(data => {
	// 		this.markers.push(new google.maps.Marker({
	// 			position: {
	// 				lat: data.lat,
	// 				lng: data.lng
	// 			},
	// 			map: this.map,
	// 			plaqueData: data,
	// 			icon: {
	// 				url: 'build/assets/img/icons/blue-plaques-pin.svg',
	// 				anchor: new google.maps.Point(11.8, 11.8)
	// 			}
	// 		}));
	// 	});

	// 	this.markers.map(marker => {
	// 		marker.addListener('click', () => {
	// 			if (this.infowindow) {
	// 				this.infowindow.close();
	// 			}
	// 			console.log(marker);
	// 			let content = '<h4>' + marker.plaqueData.title + '</h4><a data-plaqueid="' + marker.plaqueData.id + '">More information</a>';
	// 			this.infowindow = new google.maps.InfoWindow({
	// 				content: content
	// 			});
	// 			this.infowindow.open(this.map, marker);
				
	// 		});
	// 	});
	// }

}
