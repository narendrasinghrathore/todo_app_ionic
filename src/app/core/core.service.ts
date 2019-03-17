import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable()
export class CoreService {

  toastConfig: ToastOptions = {
    animated: true,
    duration: 1500,
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'Done'
  };

  constructor(private toast: ToastController) { }


  async displayToast(message: string) {
    const toast = await this.toast.create({
      message, ...this.toastConfig
    });
    toast.present();
  }
}
