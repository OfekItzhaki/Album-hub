import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalImagesService } from '../../services/local-images-service/local-images.service'

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('video')
  public video!: ElementRef;

  @ViewChild('canvas')
  public canvas!: ElementRef;

  public constructor
  (
    private localImagesService: LocalImagesService,
  ) {}

  public ngOnInit() {}

  // using window.URL.createObjectURL will not work (and browser drop support for it) so you will need to pass the
  // stream object from the call back of getUserMedia directly to the video.nativeElement.srcObject
  // TODO: explain viewChild
  public ngAfterViewInit() {
    console.log('TEST ngAfterViewInit');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  private: boolean = false;

  privatePressed: boolean = false; // 
  snapPressed: boolean = false; // 
  saveImage: boolean = false;
  capturedImg: any; // the last caputed image

  public capture() {
    // you will need to draw the image on a canvas so you can extract the data and save it
    // the canvas will be display:none
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    // send the image as base64 to the server
    // this.addSnapToServer(this.canvas.nativeElement.toDataURL('image/png'));
    this.capturedImg = this.canvas.nativeElement.toDataURL('image/png');
    
    this.snapPressed = true;
  }

  keepSnap(saveImg: boolean): void {
    this.snapPressed = false;
    this.saveImage = saveImg;
  }

  changePrivacy(privacy: boolean) {
    this.privatePressed = true;
    this.private = privacy;

    this.localImagesService.addSnapToServer(this.capturedImg, this.private);

    this.saveImage = false;
    this.private = false;
    this.privatePressed = false;
    this.capturedImg = null;
  }
}

