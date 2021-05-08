import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server-service/server.service'

@Component({
  selector: 'app-library-data',
  templateUrl: './library-data.component.html',
  styleUrls: ['./library-data.component.css'] 
})
export class LibraryDataComponent implements OnInit, OnDestroy {

  constructor
  (
    private router: Router,
    private serverService: ServerService 
  ) { }

  allowCamera!: boolean;
  allowLocation!: boolean;
  privateMode!: boolean;
  privateKey!: string;
  subscription!: Subscription;

  libraryName: string = "";
  description: string = "";

  // DO NOT USE ON PRODUCTION
  checkList() {
    console.log("camera: " + this.allowCamera);
    console.log("locatino: " + this.allowLocation);
    console.log("mode: " + this.privateMode);
    console.log("key: " + this.privateKey);
    console.log("name: " + this.libraryName);
    console.log("description: " + this.description);
  }

  ngOnInit(): void { 
    this.subscriptionInit();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.serverService.cameraState.subscribe(allowCamera => this.allowCamera = allowCamera);
    this.subscription = this.serverService.locationState.subscribe(allowLocation => this.allowLocation = allowLocation);
    this.subscription = this.serverService.privateState.subscribe(privateMode => this.privateMode = privateMode);
    this.subscription = this.serverService.keyState.subscribe(privateKey => this.privateKey = privateKey);
  }

  subscriptionDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.subscriptionInit();
    this.checkList();
    this.sendLibraryParameters();
    this.JumpToApplication();
  }

  sendLibraryParameters() {
    this.serverService.checkIfFolderExists();
    this.serverService.setLibraryData(this.allowCamera, this.allowLocation, this.privateMode, this.privateKey, this.libraryName, this.description);
  }

  JumpToApplication() {
    this.router.navigate(['/publicfolder']);
  }

}
