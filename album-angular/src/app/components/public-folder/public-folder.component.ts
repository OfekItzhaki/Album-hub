import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-folder',
  templateUrl: './public-folder.component.html',
  styleUrls: ['./public-folder.component.css']
})
export class PublicFolderComponent implements OnInit, OnDestroy {

  constructor
  (
    public  dialog: MatDialog,
    private localImagesService: LocalImagesService,
  ) { }

  uploadState: boolean = false;
  publicImages: Array<any> = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();
    this.localImagesService.getPublicImages();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.localImagesService.uploadState.subscribe(uploadState => this.uploadState = uploadState);
    this.subscription = this.localImagesService.publicImgsState.subscribe(publicImages => this.publicImages = publicImages);
  }

  subscriptionDestroy() {
    this.subscription.unsubscribe();
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
        this.localImagesService.uploadToServer(file, false);
  
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