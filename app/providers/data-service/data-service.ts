import {Storage, SqlStorage, Toast} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class Plaque {
  id: number;
  title: string;
  inscription: string;
  thumbnail_url: string;
  address1: string;
  area: string;
  city: string;
  borough: string;
  postcode: string;
  full_address: string;
  lat: number;
  lng: number;
  profession: string;
  categories: string;

  constructor(id: number, title: string, inscription: string, thumbnail_url: string, address1: string, area: string, city: string, borough: string, postcode: string, full_address: string, lat: number, lng: number, profession: string, catagories: string ) {
    this.id = id;
    this.title = title;
    this.inscription = inscription;
    this.thumbnail_url = thumbnail_url;
    this.address1 = address1;
    this.area = area;
    this.city = city;
    this.borough = borough;
    this.postcode = postcode;
    this.full_address = full_address;
    this.lat = lat;
    this.lng = lng;
    this.profession = profession;
    this.categories = catagories;
  }
}

@Injectable()
export class DataService {
  
  storage: Storage = null;

  remoteData: any;

  constructor(private http: Http) {

    

    this.storage = new Storage(SqlStorage);
    // this.storage.query('DROP TABLE IF EXISTS blueplaquesdb');
    // this.storage.query('CREATE TABLE IF NOT EXISTS blueplaquesdb (id INTEGER, title TEXT, inscription TEXT, thumbnail_url TEXT, address1 TEXT, area TEXT, city TEXT, borough TEXT, postcode TEXT, full_address TEXT, lat REAL, lng REAL, profession BLOB, categories BLOB)');
    this.storage.query('DROP TABLE IF EXISTS jsonstringdb');
    this.storage.query('CREATE TABLE IF NOT EXISTS jsonstringdb (data TEXT)');
    this.updatePlaques();


  }

  public updatePlaques() {
    this.http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/491364/blueplaquedata.json').map(res => res.json()).subscribe(data => {
      this.remoteData = JSON.stringify(data.plaques);
      // console.log(this.remoteData);
      // this.remoteData.map( res => {
   
      // let sql = 'INSERT INTO blueplaquesdb (id, title, inscription, thumbnail_url, address1, area, city, borough, postcode, full_address, lat, lng, profession, categories) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      //   this.storage.query(sql, [res.id, res.t, res.s, res.ip, res.l, res.ar, res.tc, res.bor, res.pc, res.fa, res.lat, res.lng, res.prof, res.cat]);
      
      // });
      
      this.storage.set('data',this.remoteData);
      
    });
  }

  public getPlaques() {
      return this.storage.getJson('data')
  }



  private presentToast() {
    let toast = Toast.create({
      message: 'Loading Blue Plaques'
    });
  }

}

