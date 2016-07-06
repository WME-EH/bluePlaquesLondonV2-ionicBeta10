import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {NearMePage} from '../near-me/near-me';
import {SearchPage} from '../search/search';
import {WalkingToursPage} from '../walking-tours/walking-tours';
import {DataService, Plaque} from '../../providers/data-service/data-service';

@Component({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	plaques: Plaque[];
	private rootPage: any;

	

	constructor(private nav: NavController, public dataService: DataService) {
		this.nav = nav;
		// this.dataService.getPlaques();
	}

	private loadPlaques() {
		this.plaques = [];
		this.dataService.getPlaques().then(data => {
			console.log(data);
			// Do stuff with the data...
		});
	}


	private ionViewDidEnter() {
		this.loadPlaques();
	}

}