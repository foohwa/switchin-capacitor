import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { DealsService } from '../services/deals/deals.service';
import { Deals } from '../services/deals/deals.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  coordinates: any;
  deviceInfo: any;
  selectedImage: string;
  loginInfo: string;

  // Auth
  status: string;
  uid: Observable<string>;

  // Deals
  deals: Observable<Deals[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private authService: AuthService,
    private dealsService: DealsService
  ) {}

  get platformWidth() {
    return this.platform.width();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.authService.autoLogin().subscribe();

    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        from(App.getInfo())
          .pipe(take(1))
          .subscribe(
            (info) => {
              this.deviceInfo = info;
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });

    this.authService.userIsAuthenticated.subscribe((next) => {
      console.log(next);
      this.status = next ? 'Authenticated' : 'Unauthenticated';
    });

    this.uid = this.authService.token;

    this.deals = this.dealsService.deals.pipe(tap((next) => console.log(next)));
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      this.selectedImage = image.webPath;
    } catch (e) {
      console.log('User close the camera');
    }
  }

  async getCurrentLocation() {
    try {
      console.log('Getting yr location');
      const currentPosition = await Geolocation.getCurrentPosition();

      console.log(currentPosition);

      this.coordinates = `Lattitude: ${currentPosition.coords.latitude} Longtitude: ${currentPosition.coords.longitude}`;
    } catch (e) {
      console.log('Cannot access location');
    }
  }

  triggerButton() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: 'Cool',
    });
  }

  loginUser() {
    this.authService.loginUser().subscribe();
  }

  registerUser() {
    this.authService.registerUser();
  }

  logoutUser() {
    this.authService.logout().subscribe();
  }

  addFavourite(id: string) {}
}
