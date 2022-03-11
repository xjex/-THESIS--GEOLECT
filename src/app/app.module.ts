import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { UserService } from './user.service';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {TranslateProvider}  from './translate';
import { ToastAllert} from './toast'
import {DictionaryProvider}  from './dictionary';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { from } from 'rxjs';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import * as firebase from 'firebase'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { OCR } from '@ionic-native/ocr/ngx';
import { Crop } from '@ionic-native/crop/ngx';








 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    
     // imports firebase/firestore, only needed for database features
   
   
    
    
  ],
  providers: [
    
    StatusBar,Geolocation,NativeGeocoder,
    SplashScreen,
    SpeechRecognition,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService ,
    AngularFirestore ,
    TranslateProvider,
    Camera,
    OCR,
    File,
    ToastAllert,
    ImagePicker,
    Crop,
    DictionaryProvider
    
  

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
