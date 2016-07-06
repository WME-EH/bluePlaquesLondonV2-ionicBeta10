import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService, Plaque} from '../../providers/data-service/data-service';

/*
  Generated class for the PlaqueDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/plaque-details/plaque-details.html',
})
export class PlaqueDetailsPage {
	public plaqueID;
	result;

	constructor(private nav: NavController, private navParams: NavParams, private dataService: DataService) {
		this.plaqueID = navParams.get('plaqueID');
		this.showPlaqueInfo();
	}

	showPlaqueInfo() {
		let searchRegex = new RegExp(this.plaqueID,'g');
		this.dataService.getPlaques().then(data => {
			this.result = data.filter(el => {
	    		return searchRegex.test(el.id);
			});;
			console.log(this.result);
		});
	}



}
