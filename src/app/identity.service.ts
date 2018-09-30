import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class IdentityService {

  constructor(private db: AngularFireDatabase) { }

  getIdentities() {
    return this.db.list('/identities');
  }

}
