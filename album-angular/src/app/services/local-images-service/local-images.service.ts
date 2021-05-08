import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalImagesService {

  private publicImgsSource = new BehaviorSubject([]);
  publicImgsState = this.publicImgsSource.asObservable();

  private favImgsSource = new BehaviorSubject([]);
  favImgsState = this.favImgsSource.asObservable();

  private privateImgsSource = new BehaviorSubject([]);
  privateImgsState = this.privateImgsSource.asObservable();

  private uploadSource = new BehaviorSubject(false);
  uploadState = this.uploadSource.asObservable();



  constructor( private http: HttpClient ) { }


  editPublicImgs(publicImgs: any) {
    this.publicImgsSource.next(publicImgs)
  }

  editFavImgs(publicImgs: any) {
    this.publicImgsSource.next(publicImgs)
  }
  
  editPrivateImgs(privateImgs: any) {
    this.privateImgsSource.next(privateImgs)
  }

  editUploadState(uploadState: boolean) {
    this.uploadSource.next(uploadState)
  }


  addSnapToServer(base64Image: any, privacy: boolean) {
    this.http
      .post('http://localhost:5555/snap', { image: base64Image, private: privacy}, { responseType: 'text' })
      .subscribe((res) => {
        console.log(res);
      });
  }


  uploadToServer(base64Image: any, privacy: boolean) {
    this.http
      .post('http://localhost:5555/upload', { image: base64Image, private: privacy}, { responseType: 'text' })
      .subscribe((res) => {
        console.log(res);
      });
  }
  

  getPublicImages() {
    console.log("getting public images.. ");
    this.http.get('http://localhost:5555/publicimages').subscribe((res: any) => {
      this.editPublicImgs(res);
    })
  }

  getFavoritePublicImages(id: string) {
    console.log("getting favorite public images.. ");
    this.http.get(`http://localhost:5555/favimages`).subscribe((res: any) => {
      this.editPublicImgs(res);
    })
  }

  getPrivateImages() {
    console.log("getting private images.. ");
    this.http.get('http://localhost:5555/privateimages').subscribe((res: any) => {
      this.editPrivateImgs(res);
    })
  }

  updatePropertiesOfImage(img: any, priv: any, fav: any) {
    this.http
    .post('http://localhost:5555/update', { image: img, private: priv, favorite: fav }, { responseType: 'text' })
    .subscribe((res) => {
      console.log(res);
    });
  }

  removeImage(id: number) {
    this.http
    .post('http://localhost:5555/removeimage', { id: id }, { responseType: 'text' })
    .subscribe((res) => {
      console.log(res);
    });
  }
}
