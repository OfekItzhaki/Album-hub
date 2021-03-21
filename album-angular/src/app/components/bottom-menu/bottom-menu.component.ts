import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LocalImagesService } from '../../services/local-images-service/local-images.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  public bottomMenu!: MatSidenav;
  
  constructor
  (
    private router: Router,
    private localImagesService: LocalImagesService,
  ) { }

  uploadState: boolean = false;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();
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

  reason = '';

  toggle = true;
  status = 'Closed';

  toggleState() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Closed' : 'Opened';
  }

  openMenu() {
    this.toggleState();
    this.bottomMenu.open();
  }
  
  closeMenu(reason: string) {
    this.toggleState();

    this.reason = reason;
    this.bottomMenu.close();
  }

  shouldRun = true;


  goToSlideshow() {
    this.closeMenu("moving to slideshow");
    console.log("to slideshow");
    this.router.navigate(['/slideshow']);
  }


  // change the upload state value to the opposite of the current value 
  importObserve() {
    console.log(this.uploadState);
    this.localImagesService.editUploadState(!this.uploadState);
    console.log(this.uploadState);
  }
}
