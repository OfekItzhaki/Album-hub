import { Component, OnInit, OnDestroy } from '@angular/core';
import { PexelPhotoSearchService } from '../../services/pexel-photo-search-service/pexel-photo-search.service';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-online-images',
  templateUrl: './online-images.component.html',
  styleUrls: ['./online-images.component.css']
})
export class OnlineImagesComponent implements OnInit, OnDestroy {

  uploadState: boolean = false;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();
    this.localImagesService.getPublicImages();
    this.searchPhotos(this.searchByCategory);
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.localImagesService.uploadState.subscribe(uploadState => this.uploadState = uploadState);
  }

  subscriptionDestroy() {
    this.subscription.unsubscribe();
  }

  categories: string[] = [  
    "People",
    "Animals",
    "Nature",
  ];

  searchByName: string = "";
  searchByCategory: string = this.categories[0];
  perPage: number = 10;
  data: any[] = [];

  // checkedArray: string[] = [];
  blobArray: Blob[] = [];
  uploadDataArray: any[] = [];

  
  constructor
  (
    private pexelPhotoSearchService: PexelPhotoSearchService,
    private localImagesService: LocalImagesService,
  ) { this.pexelPhotoSearchService.getData(this.searchByName, this.perPage); }

 
  searchPhotos(value: string) {
    this.pexelPhotoSearchService.getData(value, this.perPage).subscribe((data) => {
      console.log(data);
      this.data = data.photos;
    }, (error) => {
      console.log(error);
    })
  }

  onInput () {
    if (this.perPage >= 50) {
      this.perPage = 49;
    }
}

  onClickUpload() {
    console.log("upload images was clicked ..");
    let checkboxes = document.getElementsByClassName("checkbox");
    for (let index = 0; index < this.data.length; index++) {

      let checkbox = checkboxes[index] as HTMLInputElement;

      if (checkbox.checked == true &&
          this.data[index].id == checkbox.id) {


            let file = this.data[index];
            let blobFile: any = null;

            let source;
            if (file.src.original) { // case the file is any file and has the original size
              source = file.src.original;
            }
            else { // case the file is a html element and has only the small size
              source = file.src.small;
            }

            this.loadXHR(`${source}`).then(function(blob) { // -------- ASYNC AWAIT instead of then
              // here the image is a blob
              blobFile = blob as Blob;
            });
            // check what is BLOB


            setTimeout(() => { // ADD IF CONDITION ----- ASYNC AWAIT
              console.log("trying to upload to blob...");
              this.uploadBlob(blobFile);
            }, 1000);
      }
    }
  }

  uploadBlob(blob: Blob): any {
    let reader = new FileReader();

    let file = blob as Blob;

    //convert file (any file) to DataUrl
    reader.readAsDataURL(file);
    // make reference to the method so you can pass the reader results
    let f = (file: string | ArrayBuffer | null) => {
      this.localImagesService.uploadToServer(file, false);
    };
    // after the reader is finished
    reader.onload = () => {
      // call the method reference
      f(reader.result);
    };
  }

  loadXHR(url: string) {
    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });
  }

}
