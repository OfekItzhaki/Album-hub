import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  constructor
  (
    private localImagesService: LocalImagesService,
  ) { }
  
    image: any;
    publicImages: Array<any> = [];
    subscription!: Subscription;
    intervalId: any;
    previousRandom: number = -1;
  
    ngOnInit(): void {
      this.subscriptionInit();
      this.localImagesService.getPublicImages();

      setTimeout(() => {
        this.changeImage();
      }, 1000);
      
      setTimeout(() => {
        this.intervalId = setInterval(() => this.changeImage(), 2000);
      }, 1000);
    }
  
    ngOnDestroy(): void {
      this.subscriptionDestroy();
    }
  
    subscriptionInit() {
      this.subscription = this.localImagesService.publicImgsState.subscribe(publicImages => this.publicImages = publicImages);
    }
  
    subscriptionDestroy() {
      this.subscription.unsubscribe();
    }

    changeImage() {
      let currentRandom = this.getRandomNumberBetween(0, this.publicImages.length - 1);
      while (currentRandom == this.previousRandom) {
        currentRandom = this.getRandomNumberBetween(0, this.publicImages.length - 1);
      }

      this.image = this.publicImages[currentRandom];
      this.previousRandom = currentRandom;
    }

    getRandomNumberBetween(min: number, max: number) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

}
