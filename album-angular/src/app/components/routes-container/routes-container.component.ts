import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrivateModeService } from '../../services/private-mode-service/private-mode.service'

@Component({
  selector: 'app-routes-container',
  templateUrl: './routes-container.component.html',
  styleUrls: ['./routes-container.component.css']
})
export class RoutesContainerComponent implements OnInit, OnDestroy {

  constructor
  (
    private router: Router,
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

  routeClicked(route: string) {
    this.router.navigate([`${route}`]);
  }
}
