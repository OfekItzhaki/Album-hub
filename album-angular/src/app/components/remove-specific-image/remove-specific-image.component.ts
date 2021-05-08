import { Component, Input, OnInit } from '@angular/core';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'

@Component({
  selector: 'app-remove-specific-image',
  templateUrl: './remove-specific-image.component.html',
  styleUrls: ['./remove-specific-image.component.css']
})
export class RemoveSpecificImageComponent implements OnInit {

  @Input() currentImg: any;

  constructor
  (
    private localImagesService: LocalImagesService,
  ) { }

  ngOnInit(): void {
  }

  toggle = false;
  // status = 'unpressed';
  source = "../../../assets/images/icons/delete_black.png";

  toggleState() {
    this.toggle = !this.toggle;
    // this.status = this.toggle ? 'pressed' : 'unpressed';
    // console.log(this.status);
  }

  remove() {
    this.localImagesService.removeImage(this.currentImg.id);
    this.toggleState();

    // refresh the page to show changes
    this.refresh();
  }

  cancel() {
    this.toggleState();
  }

  refresh(): void {
    window.location.reload();
  }

}
