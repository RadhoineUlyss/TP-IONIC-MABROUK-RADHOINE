import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {



  constructor(private cameraPreview: CameraPreview) { }


  cameraEffect: string = 'none'

  ngOnInit() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width / 2,
      height: window.screen.height / 2,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha: 1
    }
    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }


  setColorEffect() {
    if (this.cameraEffect == "none")
      this.cameraPreview.setColorEffect('negative');
    else
      this.cameraPreview.setColorEffect('none');
  }


}
