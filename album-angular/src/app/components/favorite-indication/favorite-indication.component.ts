import { Component, Input, OnInit } from '@angular/core';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'

@Component({
  selector: 'app-favorite-indication',
  templateUrl: './favorite-indication.component.html',  
  styleUrls: ['./favorite-indication.component.css']
})
export class FavoriteIndicationComponent implements OnInit {

  @Input() currentImg: any;

  constructor
  (
    private localImagesService: LocalImagesService,
  ) { }

  ngOnInit(): void {
    if (this.currentImg.favorite == true) {
      this.toggle = true;
      this.status = 'fav';
      this.source = '../../../assets/images/icons/black_star.png';
    }
    else {
      this.toggle = false;
      this.status = 'unfav';
      this.source = '../../../assets/images/icons/white_star.png';
    }
  }
  
  toggle = false;
  status = 'fav';
  source = "../../../assets/images/icons/white_star.png";

  toggleState() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'fav' : 'unfav';
    this.source = this.toggle ? '../../../assets/images/icons/black_star.png' : '../../../assets/images/icons/white_star.png'
    
    this.localImagesService.updatePropertiesOfImage(this.currentImg, null, this.toggle);
  }
}
