import { Component, OnInit } from '@angular/core';
import { HashGuardService } from 'src/app/services/hash-guard/hash-guard.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  opened = false;

  constructor( private serivce: HashGuardService ) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.opened = !this.opened;
    console.log(this.opened);
  }

  userPass(pass: any): void {
    this.serivce.open(pass);
  }

  goHash(): void {
    // serivce.open()
  }
}
