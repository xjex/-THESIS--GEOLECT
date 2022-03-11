import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.page.html',
  styleUrls: ['./google-login.page.scss'],
})
export class GoogleLoginPage implements OnInit {

  constructor(private cam:Camera) { }

  ngOnInit() {
  }

  
}
