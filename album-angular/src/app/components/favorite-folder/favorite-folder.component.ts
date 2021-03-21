import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-folder',
  templateUrl: './favorite-folder.component.html',
  styleUrls: ['./favorite-folder.component.css']
})
export class FavoriteFolderComponent implements OnInit, OnDestroy {

  constructor
  (
    public dialog: MatDialog,
    private localImagesService: LocalImagesService,
  ) { }

  favImages: Array<any> = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscriptionInit();
    this.localImagesService.getPublicImages();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy();
  }

  subscriptionInit() {
    this.subscription = this.localImagesService.favImgsState.subscribe(favImages => this.favImages = favImages);
  }

  subscriptionDestroy() {
    this.subscription.unsubscribe();
  }

  refresh(): void {
    window.location.reload();
  }

  openDialog(image: any) {
    this.dialog.open(EditDetailsComponent, {
      data: {
        image: image
      }
    });
  }

}
