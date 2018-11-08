import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from './models/upload';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './alert.service';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase,
    private alertService: AlertService) { }

  private basePath = '/uploads';
  private uploadTask;

  pushUpload(upload: Upload, id: string) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${id}`).put(upload.file);
    const that = this;

    this.uploadTask.on('state_changed',
      function(snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        upload.progress = progress;
      },
      function(error) {
        this.alertService.error(error);
      },
      function() {
        that.uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          upload.url = downloadURL;
          upload.name = upload.file.name;
          that.saveFileData(upload);
        });
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
