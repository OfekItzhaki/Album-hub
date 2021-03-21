import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LocalImagesService } from '../../services/local-images-service/local-images.service';
import { PrivateModeService } from '../../services/private-mode-service/private-mode.service'
import { EditDetailsComponent } from '../edit-details/edit-details.component';

@Component({
  selector: 'app-private-folder',
  templateUrl: './private-folder.component.html',
  styleUrls: ['./private-folder.component.css']
})
export class PrivateFolderComponent implements OnInit, OnDestroy {

  constructor
  (
    private router: Router,
    public  dialog: MatDialog,
    private privateModeService: PrivateModeService,
    private localImagesService: LocalImagesService,
  ) { }

  uploadState: boolean = false;
  correctKey = false;
  privateImages: Array<any> = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();

    if (this.correctKey == false) {
      this.router.navigate(['/publicfolder'])
    }

    else {
      this.localImagesService.getPrivateImages();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.localImagesService.uploadState.subscribe(uploadState => this.uploadState = uploadState);
    this.subscription = this.privateModeService.privateKeyState.subscribe(correctKey => this.correctKey = correctKey);
    this.subscription = this.localImagesService.privateImgsState.subscribe(privateImages => this.privateImages = privateImages);
  }

  subscriptionDestroy() {
    this.subscription.unsubscribe();
  }

  privateFolder() {
    this.localImagesService.getPrivateImages();
  }

  onFileSelected(fileInputEvent: any) {
    for (let index = 0; index < fileInputEvent.target.files.length; index++) {
      let file = fileInputEvent.target.files[index];

      let reader = new FileReader();

      console.log(file);
      
      //convert file (any file) to DataUrl
      reader.readAsDataURL(file);
      // make reference to the method so you can pass the reader results
      let f = (file: string | ArrayBuffer | null) => {
        this.localImagesService.uploadToServer(file, true);
  
        // refresh the page to show changes
        this.refresh();
      };
      // after the reader is finished
      reader.onload = () => {
        // call the method reference
        f(reader.result);
      };
    }
  }

  refresh(): void {
    window.location.reload();
  }

  openDialog(image: any) {
    this.dialog.open(EditDetailsComponent, {
      data: {
        image: image
      }
    });
  }
}
