import { Component, Input, OnInit } from '@angular/core';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'

@Component({
  selector: 'app-private-indication',
  templateUrl: './private-indication.component.html',
  styleUrls: ['./private-indication.component.css']
})
export class PrivateIndicationComponent implements OnInit {

  @Input() currentImg: any;

  constructor
  (
    private localImagesService: LocalImagesService,
  ) { }

  ngOnInit(): void {
    if (this.currentImg.private == true) {
      this.toggle = true;
      this.status = 'Private';
      this.source = '../../../assets/images/icons/closed_lock.png';
    }
    else {
      this.toggle = false;
      this.status = 'Public';
      this.source = '../../../assets/images/icons/open_lock.png';
    }
  }

  toggle = false;
  status = 'Private';
  source = '../../../assets/images/icons/closed_lock.png';

  toggleState() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Private' : 'Public';
    this.source = this.toggle ? '../../../assets/images/icons/closed_lock.png' : '../../../assets/images/icons/open_lock.png'

    this.localImagesService.updatePropertiesOfImage(this.currentImg, this.toggle, null);
  }
}
