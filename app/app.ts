import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {ConnectivityService} from './providers/connectivity-service/connectivity-service';
import {DataService} from './providers/data-service/data-service';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  private rootPage: any;

  constructor(private platform: Platform) {
	  this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [ConnectivityService, DataService, GOOGLE_MAPS_PROVIDERS]);
