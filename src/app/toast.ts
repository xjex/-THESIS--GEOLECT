import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { PopoverController ,ToastController } from '@ionic/angular';



export enum words{
 
}

@Injectable()
export class ToastAllert{

verif :string = ''
f_emailsent :string = ''
    constructor(public http: HttpClient, public toasty: ToastController){
        
    }
    //profile
    async verify() {
        const toast = await this.toasty.create({
          message: `Your Verification email has been sent to: ${this.verif}`,
          duration: 2000
        });
        toast.present();
    }

    //profile
    async verificationerror() {
        const toast = await this.toasty.create({
          message: `Too many Request please check your email for Confirmation`,
          duration: 2000
        });
        toast.present();
    }

    //login-forgetpass
    async f_sent() {
        const toast = await this.toasty.create({
          message: `Your Password Reset Link has been sent to: ${this.f_emailsent}`,
          duration: 2000
        });
        toast.present();
    }


     //login-forgetpass
     async unknownemail() {
        const toast = await this.toasty.create({
          message: `Cannot Find this Email`,
          duration: 3000
        });
        toast.present();
    }

    async invalidemail() {
        const toast = await this.toasty.create({
          message: `Not a email format`,
          duration: 3000
        });
        toast.present();
    }

    //profile - changepassword
    async wrongpassword() {
      const toast = await this.toasty.create({
        message: `Wrong password`,
        duration: 3000
      });
      toast.present();
  }

  async repassword() {
    const toast = await this.toasty.create({
      message: `Password is not the same`,
      duration: 3000
    });
    toast.present();
}

async weakpassword() {
  const toast = await this.toasty.create({
    message: `Weak Password`,
    duration: 3000
  });
  toast.present();
}

  //list-phrasebook and logs
async deletedlogs() {
  const toast = await this.toasty.create({
    message: `Succesfully Deleted`,
    duration: 3000
  });
  toast.present();
}

async savelog() {
  const toast = await this.toasty.create({
    message: `Saved to Phrase book`,
    duration: 3000
  });
  toast.present();
}




    
   
}
