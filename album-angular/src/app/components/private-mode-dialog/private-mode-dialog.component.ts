import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateModeService } from '../../services/private-mode-service/private-mode.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-private-mode-dialog',
  templateUrl: './private-mode-dialog.component.html',
  styleUrls: ['./private-mode-dialog.component.css']
})
export class PrivateModeDialogComponent implements OnInit {

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private privateModeService: PrivateModeService,
    private dialogRef: MatDialog,
    private router: Router,

  ) { console.log(); } //data

  privateKey: string = "";
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



  checkPrivateKey() {
    this.privateModeService.checkPriavateKey(this.privateKey);

    setTimeout(() => {
      this.subscriptionInit();
      if (this.correctKey == true) {
        console.log("check key func: " + this.correctKey);
      this.router.navigate(['/privatefolder']);

      this.dialogRef.closeAll();
    }
  }, 2000);
  }

}
