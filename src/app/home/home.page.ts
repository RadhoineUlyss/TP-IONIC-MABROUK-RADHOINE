import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {CameraOptions, Camera} from '@ionic-native/camera/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {filter} from 'rxjs/operators';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    title: string;
    imgData: string;

    public geoLatitude: number;
    public geoLongitude: number;

    constructor(private alertController: AlertController,
                private camera: Camera,
                private geolocation: Geolocation,
                private localNotifications: LocalNotifications) {
    }

    ngOnInit(): void {
        console.log("je suis un OnInit")

        let watch = this.geolocation.watchPosition().pipe(filter((p) => p.coords !== undefined));
        watch.subscribe((data) => {
            this.geoLongitude = data.coords.longitude
            this.geoLatitude = data.coords.latitude

        });
    }

    updateTitle() {
        this.title = 'Mon Nouveau Titre';
    }

    /**
     * https://ionicframework.com/docs/api/alert
     */
    async fireAlert() {
        // creation de l alerte
        const alert = await this.alertController.create({
            header: 'Pop-up',
            subHeader: 'pop-up',
            message: 'this is a pop-up',
            buttons: ['Close']
        });
        // quand l alerte sera masquée
        alert.onDidDismiss().then(() => console.log('Masked alert message'))

        // affichage de l alerte
        await alert.present();
    }

    sendNotif() {
        this.localNotifications.schedule({
            id: 1,
            text: 'New notification'
        });

    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log(imageData);
            this.imgData = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }


}
