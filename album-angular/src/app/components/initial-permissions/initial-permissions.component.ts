import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server-service/server.service'

@Component({
  selector: 'app-initial-permissions',
  templateUrl: './initial-permissions.component.html',
  styleUrls: ['./initial-permissions.component.css']
})
export class InitialPermissionsComponent implements OnInit, OnDestroy {

  constructor( private router: Router, private serverService: ServerService ) { }

  allowCamera!: boolean;
  allowLocation!: boolean;
  privateMode!: boolean;
  privateKey!: string;
  subscription!: Subscription;

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
    this.transferPermissions();
    this.JumpToLibraryData();
  }

  JumpToLibraryData() {
    this.router.navigate(['librarydata']);
  }

  transferPermissions() {
    this.serverService.editCamera(this.allowCamera);
    this.serverService.editLocation(this.allowLocation);
    this.serverService.editPrivate(this.privateMode);
    this.serverService.editKey(this.privateKey);
  }
}
