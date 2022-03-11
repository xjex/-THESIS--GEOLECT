import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router'
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {UserService} from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Phrasebook',
      url: '/templates',
      icon: 'heart'
    },
    {
      title: 'Logs',
      url: '/list',
      icon: 'list'
    },
     {
      title: 'Settings',
      url: '/profile',
      icon: 'build'
    },
 
  ];

  uiddata
  sub
  userdata: string = ''


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afauth: AngularFireAuth,
    private router: Router,
    public menu: MenuController,
    public afstore: AngularFirestore,
    private userdataclr : UserService,
      
  )
 
  {
    this.initializeApp(); 

    {
      this.afauth.authState.subscribe(async datauid => {
        this.uiddata = datauid.uid
        console.log(datauid.uid)
  
        this.sub = this.afstore.doc('users/' + this.uiddata)
  
        this.sub.valueChanges().subscribe(event => {
        
          this.userdata=event
  
         
          //reverse the logs
          // this.reverse = event.translate
          // this.translate = this.reverse.reverse()
  
  
          console.log(event.Email + "THIS IS APP COMPONENT RESULTS")
        })
      })
    }
  }

  
  signout(){
 
    console.log('trigger')
    this.afauth.auth.signOut().then(() => {
    this.router.navigateByUrl('/login');
    console.log('logged out')
    this.userdataclr.u_pass = ""
    
     this.menu.enable(false);
    })
  }

  profile(){
    this.router.navigateByUrl('/profile')
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }

  
 
 
  
}
