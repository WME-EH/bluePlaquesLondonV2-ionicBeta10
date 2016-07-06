import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, Content, Popover} from 'ionic-angular';
import {DataService, Plaque} from '../../providers/data-service/data-service';
import {PlaqueDetailsPage} from '../plaque-details/plaque-details';

@Component({
  templateUrl: 'build/pages/search/popover.html'
  // template: `
  //   <ion-list>
  //     <ion-item>
  //       <ion-label>Gaming</ion-label>
  //       <ion-select>
  //         <ion-option value="nes">NES</ion-option>
  //         <ion-option value="n64">Nintendo64</ion-option>
  //         <ion-option value="ps">PlayStation</ion-option>
  //         <ion-option value="genesis">Sega Genesis</ion-option>
  //         <ion-option value="saturn">Sega Saturn</ion-option>
  //         <ion-option value="snes">SNES</ion-option>
  //       </ion-select>
  //     </ion-item>
  //   </ion-list>
  // `
})

class SearchPopover {
  constructor(private navParams: NavParams) {}
}

@Component({
  templateUrl: 'build/pages/search/search.html'
})

export class SearchPage {

  @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
  
	searchQuery: string = '';
	results;
	searchResults

  constructor(public nav: NavController, private dataService: DataService) {
  	this.initialiseItems();

  }

  initialiseItems() {
  	this.dataService.getPlaques().then(data => {
  		this.results = data;
  	});
  }

  searchItems(searchbar) {
  	var query = searchbar.target.value.trim().split(' ');
  	let queryString = '';
    
  	query.forEach((el,i,arr) => {
      queryString += "(?=.*" + el + ")";
  	});


  	let searchRegex = new RegExp(queryString, 'igm');
    console.log(searchRegex);
  

	this.searchResults = this.results.filter(el => {
		if (el.s) {
      return searchRegex.test(el.s.replace(/\W/g, ''));
		}
	});
	console.log(this.searchResults.length);
  }

  showDetail(id) {
    console.log(id);
    this.nav.push(PlaqueDetailsPage, { plaqueID: id});
  }

  presentPopover(ev) {
    let popover = Popover.create(SearchPopover);

    this.nav.present(popover, {ev:ev});
}

}
