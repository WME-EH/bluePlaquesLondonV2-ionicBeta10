import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {NearMePage} from '../near-me/near-me';
import {SearchPage} from '../search/search';
import {AboutPage} from '../about/about';
import {WalkingToursPage} from '../walking-tours/walking-tours';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {

	
	private tab1Root: any;
	private tab2Root: any;
	private tab3Root: any;
	private tab4Root: any;
	private tab5Root: any;

  constructor() {
	this.tab1Root = HomePage;
	this.tab2Root = NearMePage;
	this.tab3Root = SearchPage;
	this.tab4Root = WalkingToursPage;
	this.tab5Root = AboutPage;
  }

}
