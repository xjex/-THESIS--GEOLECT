import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { PopoverController ,ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Accounts } from 'src/Models/accounts';

import {ToastAllert} from '../toast'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email:string ="";
password:string = "";
loguser:string= '';
logpass:string = '';
forget = false
sign = true

f_email : string = ''


acc = {} as Accounts;

  constructor(public navctrl:NavController,
              private router: Router,
              private alertcont: AlertController, 
              private menu: MenuController, 
              private toast: ToastAllert,
              private servicehandler : UserService,
              public afAuth: AngularFireAuth ,
              public user: UserService ) {
                
                
                
               }
               

  ngOnInit() {
    this.menu.enable(false);

    this.afAuth.authState.subscribe(async data => {
      if(data.email && data.uid){
        this.router.navigateByUrl('/home');
        this.menu.enable(true);
    }
    })
   
  }

async googlesignin(){
  const provider = new auth.GoogleAuthProvider();
  const credential = await this.afAuth.auth.signInWithPopup(provider);


    this.email = ""
    this.password = ""
    this.router.navigateByUrl('/home');
    this.menu.enable(true);
      console.log("Account Gmailok")
     


}

async signin(acc: Accounts){
  console.log("email: " + this.acc.email);
  console.log("Password: " + this.acc.password);
  
const{acc : Accounts} = this

      try {
    const res = await this.afAuth.auth.signInWithEmailAndPassword(Accounts.email , Accounts.password)

       if(res.user){
         this.user.setUser({
           
           uid: res.user.uid 
         })
         this.servicehandler.u_pass = this.acc.password
       this.acc.email = ""
       this.acc.password = ""
       this.router.navigateByUrl('/home');
       this.menu.enable(true);

       console.log("Account OK " + this.servicehandler.u_pass)
                              }
      } catch (err) {
        console.dir(err)

                      if(err.code === "auth/user-not-found"){
                              console.log("USER NOT FOUND")

                              this.alertcont.create({
                                header: 'Account not found',
                                message: 'Please Enter Valid Account',
                                buttons: ['Ok']
                              }).then(alert => {
                                alert.present();
                              });
                              //
                              }

                      else if(err.code === "auth/invalid-email"){

                                this.alertcont.create({
                                  header: 'Invalid Email format',
                                  message: 'Please Enter Valid Format',
                                  buttons: ['Ok']
                                }).then(alert => {
                                  alert.present();
                                });
                                //
                              }

                      else if(err.code === "auth/wrong-password"){

                                this.alertcont.create({
                                  header: 'Invalid Password',
                                  message: 'Please Enter Valid Password',
                                  buttons: ['Ok']
                                }).then(alert => {
                                  alert.present();
                                });
                                //
                              }                                                    
                      }
              }

forgetpas(){
  this.router.navigateByUrl('/home');
  this.menu.enable(true);
  console.log(this.servicehandler.u_pass)
            }

signup(){
  this.router.navigateByUrl('/register');
  this.menu.enable(false);
        }


forgetpass(){
  this.sign= false
  this.forget = true
  console.log(this.servicehandler.u_pass)
}

con_login(){
  this.sign= true
  this.forget = false
}

async submitforget(){
  this.toast.f_emailsent = this.f_email
  
  try {
   await this.afAuth.auth.sendPasswordResetEmail(this.f_email)
      this.toast.f_sent()
  } catch (f_err) {
    console.dir(f_err)
    
        
    if(f_err.code === "auth/user-not-found"){
      this.toast.unknownemail()
      }

else if(f_err.code === "auth/invalid-email"){
      this.toast.invalidemail()
      }
      //
    
  }
  
}


}
