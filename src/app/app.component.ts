import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private platform: Platform, private toastCtrl: ToastController) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    // if (this.platform.is('hybrid')) {
    //   try {
    //     await this.ga.startTrackerWithId('G-D5DQVYT793');
    //   } catch (error) {
    //     console.log('Google Analytics Error: ' + error);
    //   }
    //
    //   const toast = await this.toastCtrl.create({
    //     message: 'Google Analytics is running now',
    //     duration: 2000,
    //   });
    //   await toast.present();
    //   await this.ga.debugMode();
    //   await this.ga.setAllowIDFACollection(true);
    //   await this.ga.trackView('Outbox');
    // }
  }
}
