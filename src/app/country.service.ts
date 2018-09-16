import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CountryService {

  constructor(private db: AngularFireDatabase) { }

  getCountries() {
    return this.db.list('/countries');
  }

}
