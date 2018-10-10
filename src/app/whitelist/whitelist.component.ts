import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { IdentityService } from '../identity.service';
import { AlertService } from '../alert.service';
import { Upload } from '../models/upload';
import { UploadService } from '../upload.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent {
  user = {};
  id;
  identities$;
  selectedFiles: FileList;
  currentUpload: Upload;
  uploadProgress: Observable<number>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private identityService: IdentityService,
    private alertService: AlertService,
    private uploadService: UploadService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
    this.identities$ = this.identityService.getIdentities();
  }

  update(user) {
    if (this.id) {
      user.idUrl = this.uploadService.getTask().snapshot.downloadURL;
      this.userService.update(this.id, user);
      this.alertService.success('Updated');
    } else {
      this.userService.save(user);
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload, this.id);
  }


}
