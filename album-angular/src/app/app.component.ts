import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './services/server-service/server.service'


@Component({
  selector: 'app-root', // <app-root/>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sela album hub';

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private serverService: ServerService ){}
  visibility:boolean=false;

  ngOnInit(){
    this.router.events.pipe(
      filter(events=>events instanceof NavigationEnd),
      map(evt => this.activatedRoute),
      map(route => {
        while(route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      ).pipe(
        filter(route => route.outlet === `primary`),
        mergeMap(route => route.data)
        ).subscribe(x=>x.navbar===true ?this.visibility=true:this.visibility=false);
  }

  checkFolderStatus() {
    this.serverService.checkIfFolderExists();
  }
}
