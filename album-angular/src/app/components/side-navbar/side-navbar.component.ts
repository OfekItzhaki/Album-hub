import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PrivateModeService } from '../../services/private-mode-service/private-mode.service'
import { PrivateModeDialogComponent } from '../private-mode-dialog/private-mode-dialog.component';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;
  
  constructor
  (
    private router: Router,
    public dialog: MatDialog,
    private privateModeService: PrivateModeService,
  ) { }

  correctKey = false;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.privateModeService.privateKeyState.subscribe(correctKey => this.correctKey = correctKey);
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

  openSidebar() {
    this.toggleState();
    this.sidenav.open();
  }
  
  closeSidebar(reason: string) {
    this.toggleState();

    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = true;


  privateMode() {
    this.closeSidebar("private mode");

    // add if
    if (this.correctKey == false) {
      this.dialog.open(PrivateModeDialogComponent);
    }
    else{
      this.privateModeService.editKeyState(false);
      if (this.router.url === '/privatefolder') {
        this.router.navigate(['/publicfolder'])
      }
    }
  }

  aboutClicked () {
    window.open("www.ofekitzhaki.com", "_blank");
  }

}
