import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
  import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase'

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';





@Component({
  selector: 'app-f-pass',
  templateUrl: './f-pass.page.html',
  styleUrls: ['./f-pass.page.scss'],
})

export class FPassPage implements OnInit {

  captureDataUrl
  urldata
  urlholder : string = ''
  constructor(public navCtrl: NavController,  
    alertCtrl: AlertController , 
    private Camera:Camera , 
    private storage: AngularFireStorage,
    private afauth: AngularFireAuth,
    private afstore: AngularFirestore) {
    
 }


  ngOnInit() {
  }


  opencam(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.Camera.getPicture(cameraOptions)
    .then((captureDataUrl) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
   }, (err) => {
       console.log(err);
   });
  }  
  
  
  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.Camera.getPicture(cameraOptions)
    .then((captureDataUrl) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
   }, (err) => {
       console.log(err);
   });
  }  

upload() {


 //image name
 const filename = this.afauth.auth.currentUser.email
 //uploaded photo path
  const path = `images/${filename}.jpg`;

  
    let storageRef = firebase.storage().ref();
    

    // Create a reference to 'images/  to storage
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    const imagepath = (`images/${filename}.jpg`);

    //geting downloadUrl of uploaded photo
    const storageurl = this.storage.ref(path)
    this.urldata = storageurl.getDownloadURL()
    this.urldata.subscribe(resp =>{console.log(resp)
        this.urlholder = resp
    })


    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot)=> {
         this.savephotourl()
    });
  }


  async savephotourl(){
    try {
      await this.afstore.collection('users').doc(this.afauth.auth.currentUser.uid).update({
      PhotoUrl: this.urlholder
        })

        this.afauth.auth.currentUser.updateProfile({
          photoURL: this.urlholder
        })

    } catch (error) {
      console.dir(error)
    }
  }

  
 
  


}
