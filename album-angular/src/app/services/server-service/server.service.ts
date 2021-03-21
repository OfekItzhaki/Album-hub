import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private cameraSource = new BehaviorSubject(false);
  cameraState = this.cameraSource.asObservable();

  private locationSource = new BehaviorSubject(false);
  locationState = this.locationSource.asObservable();

  private privateSource = new BehaviorSubject(false);
  privateState = this.privateSource.asObservable();

  private keySource = new BehaviorSubject("");
  keyState = this.keySource.asObservable();


  
  constructor( private http: HttpClient, private router: Router ) { }



  editCamera(allowCamera: boolean) {
    this.cameraSource.next(allowCamera)
  }
  
  editLocation(allowLocation: boolean) {
    this.locationSource.next(allowLocation)
  }

  editPrivate(privateMode: boolean) {
    this.privateSource.next(privateMode)
  }

  editKey(privateKey: string) {
    this.keySource.next(privateKey)
  }




  setLibraryData(allowCamera: boolean, allowLocatino: boolean, privateMode: boolean, privateKey: string, id: string, description: string) {
    this.http
    .post('http://localhost:5555/createfolder', {
      allowCamera: allowCamera,
      allowLocatino: allowLocatino,
      privateMode: privateMode,
      privateKey: privateKey,
      id: id,
      description: description
    }).subscribe((res) => {
      console.log(res);
    })
  }


  checkIfFolderExists() {                       // might work on it a bit more
    let resBool = false;
    this.http
    .get('http://localhost:5555/folderexists').subscribe((res) => {

      console.log("checking if folder exists");
      resBool = res as boolean;

      if (resBool == false) {
        this.router.navigate(['buildlibrary']);
      }

      else {
        resBool = true;
        this.router.navigate(['onlineimages']);
      }
    })
    console.log("resBool is" + resBool)
  }
}
