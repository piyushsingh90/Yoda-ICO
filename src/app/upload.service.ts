import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from './models/upload';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (error) => {
        console.log(error);
      },
      () => {
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      });
  }

  private saveFileData(upload: Upload) {
    this.db.list('/uploads').push(upload);
  }

  public getBytesTransferred() {
    return this.uploadTask.snapshot.bytesTransferred;
  }

  public getTotalBytes() {
    return this.uploadTask.snapshot.totalBytes;
  }

  public getTask() {
    return this.uploadTask;
  }

}
