import { Component, ChangeDetectorRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {Platform , ToastController, ActionSheetController} from '@ionic/angular';

import { matches } from '@ionic/core/dist/types/components/nav/view-controller';
import { AlertController } from '@ionic/angular'

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { TranslateProvider } from '../translate';

import {AngularFireAuth} from '@angular/fire/auth';

import { auth, User, firestore, database } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { stringify } from 'querystring';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import *as Tesseract from 'tesseract.js'
import { JsonPipe } from '@angular/common';

import { OCR, OCRResult, OCRSourceType} from '@ionic-native/ocr/ngx'
import { Crop } from '@ionic-native/crop/ngx';
import {File} from '@ionic-native/file/ngx'







@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lat:string = '';
  long:string = '';
  err:string = '';
  georesult:string = '';
  talkavail: boolean;
  georesult2:string = '';
  transJSON:string = '';
  transresult : string = '';
  from : string = '';
  to : string = '';
  texttrans : string = '';
  talk: string = '' ;
  donelocating: string = '' ;
  hideMe=false;
  repeat=false;
  hiderMe= true;
  textfield = false;
  loader = false;
  locloader = true;
  tg :string = '';
  arealocation :string = '';
  autodetect: string = '';
  fl:string = '';
  tdate: string = '';
  fromswitch: string = '';
  removeruni: string = '';
  tglenght

  wordstotext = false;

thoshow = false;


//photodata
selectedimage
imageText
captureDataUrl
cropedImg

//OCR results
resocr
blocks
blockres
text
textres
words
wordres
ocrlenght

  

  

  constructor(public geolocation : Geolocation , 
              public geocoder: NativeGeocoder ,
              public platform:Platform , 
              private speechRecognition: SpeechRecognition,
              private tts: TextToSpeech,
              private translateProvider: TranslateProvider,
              public alertController: AlertController,
              private afauth: AngularFireAuth,
              private toast: ToastController,
              public afstore: AngularFirestore,
              public user: UserService,
              private cd : ChangeDetectorRef,
              private act : ActionSheetController,
              private camera: Camera,
              private ocr: OCR,
              private crop: Crop,
             public file :File) {
         
    
         this.platform.ready().then(()=>{
         this.geolocation.getCurrentPosition().then((position)=>{
          
        var latitude = position.coords.latitude;
        var longtitude = position.coords.longitude;
        this.ReverseGeocoding (latitude , longtitude);
      })
    })
  }

 
  ngOnInit() {

    this.afauth.authState.subscribe(async data => {
      if(data.email && data.uid){
        (await this.toast.create({
          message: `Welcome ${data.email}`,
          duration: 3000
        })).present();
        console.log(data)
    }
      else{
        (await this.toast.create({
          message: `Could not found User ID`,
          duration: 3000
        })).present();
      }
    })
      

    
    
    
    //text to speech
      
      this.speechRecognition.hasPermission()
       .then((hasPermission: boolean) => {
        if(!hasPermission){
          this.speechRecognition.requestPermission()
         .then(
             () => console.log('Granted'),
             () => console.log('Denied')
             )
             }
          
            });
  }

  //end of oninit

  //working text to speech but not updating unless it clicked
  startlisten(){
    this.speechRecognition.startListening()
      .subscribe(
        (matches: string[]) => this.texttrans = matches[0].toString()
        
      ) 
  }

//testing new code
//WORKING , CURRENT USE FOR TEXT TO SPEECH
  async sstartlisten(){
   try {
     await this.speechRecognition.startListening()
    .subscribe(matches=> {
      this.texttrans = matches[0].toString()
      this.cd.detectChanges()
    })
     //this.wordstotext  = true
     


   } catch (err) {
     console.dir(err)
   }
     
  
    
  }

 
  
    
 

  ReverseGeocoding(latitude , longtitude){
    
    var options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
  }

  this.locloader =true
  this.geocoder.reverseGeocode(latitude, longtitude, options)
   
  .then((result: NativeGeocoderResult[]) => {
    if(this.georesult= (JSON.stringify(result[0]['subAdministrativeArea' ]))){
      this.locloader = false
      this.arealocation = this.georesult.split('"').join("")
    }

    console.log(JSON.stringify(result[0]))
    
  })
  

  }



  dialect={
    from:"",
    to:"",
    fr:""
    
  }

  statelist=[{
    id:'en',
    first:'English'
  },{
    id:'tl',
    first:'Tagalog'
  },{
    id:'ceb',
    first:'Cebuano'
  }]
  
  languagelist = [
    {
      id:'',
      auto:'Auto Detect'
    },
    {
      "id": "aa",
      "first": "Afar"
    },
    {
      "id": "ab",
      "first": "Abkhazian"
    },
    {
      "id": "ae",
      "first": "Avestan"
    },
    {
      "id": "af",
      "first": "Afrikaans"
    },
    {
      "id": "ak",
      "first": "Akan"
    },
    {
      "id": "am",
      "first": "Amharic"
    },
    {
      "id": "an",
      "first": "Aragonese"
    },
    {
      "id": "ar",
      "first": "Arabic"
    },
    {
      "id": "as",
      "first": "Assamese"
    },
    {
      "id": "av",
      "first": "Avaric"
    },
    {
      "id": "ay",
      "first": "Aymara"
    },
    {
      "id": "az",
      "first": "Azerbaijani"
    },
    {
      "id": "ba",
      "first": "Bashkir"
    },
    {
      "id": "be",
      "first": "Belarusian"
    },
    {
      "id": "bg",
      "first": "Bulgarian"
    },
    {
      "id": "bh",
      "first": "Bihari languages"
    },
    {
      "id": "bi",
      "first": "Bislama"
    },
    {
      "id": "bm",
      "first": "Bambara"
    },
    {
      "id": "bn",
      "first": "Bengali"
    },
    {
      "id": "bo",
      "first": "Tibetan"
    },
    {
      "id": "br",
      "first": "Breton"
    },
    {
      "id": "bs",
      "first": "Bosnian"
    },
    {
      "id": "ca",
      "first": "Catalan; Valencian"
    },
    {
      "id": "ce",
      "first": "Chechen"
    },
    {
      "id": "ch",
      "first": "Chamorro"
    },
    {
      "id": "co",
      "first": "Corsican"
    },
    {
      "id": "cr",
      "first": "Cree"
    },
    {
      "id": "cs",
      "first": "Czech"
    },
    {
      "id": "cu",
      "first": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic"
    },
    {
      "id": "cv",
      "first": "Chuvash"
    },
    {
      "id": "cy",
      "first": "Welsh"
    },
    {
      "id": "da",
      "first": "Danish"
    },
    {
      "id": "de",
      "first": "German"
    },
    {
      "id": "dv",
      "first": "Divehi; Dhivehi; Maldivian"
    },
    {
      "id": "dz",
      "first": "Dzongkha"
    },
    {
      "id": "ee",
      "first": "Ewe"
    },
    {
      "id": "el",
      "first": "Greek, Modern (1453-)"
    },
    {
      "id": "en",
      "first": "English"
    },
    {
      "id": "eo",
      "first": "Esperanto"
    },
    {
      "id": "es",
      "first": "Spanish; Castilian"
    },
    {
      "id": "et",
      "first": "Estonian"
    },
    {
      "id": "eu",
      "first": "Basque"
    },
    {
      "id": "fa",
      "first": "Persian"
    },
    {
      "id": "ff",
      "first": "Fulah"
    },
    {
      "id": "fi",
      "first": "Finnish"
    },
    {
      "id": "fj",
      "first": "Fijian"
    },
    {
      "id": "fo",
      "first": "Faroese"
    },
    {
      "id": "fr",
      "first": "French"
    },
    {
      "id": "fy",
      "first": "Western Frisian"
    },
    {
      "id": "ga",
      "first": "Irish"
    },
    {
      "id": "gd",
      "first": "Gaelic; Scottish Gaelic"
    },
    {
      "id": "gl",
      "first": "Galician"
    },
    {
      "id": "gn",
      "first": "Guarani"
    },
    {
      "id": "gu",
      "first": "Gujarati"
    },
    {
      "id": "gv",
      "first": "Manx"
    },
    {
      "id": "ha",
      "first": "Hausa"
    },
    {
      "id": "he",
      "first": "Hebrew"
    },
    {
      "id": "hi",
      "first": "Hindi"
    },
    {
      "id": "ho",
      "first": "Hiri Motu"
    },
    {
      "id": "hr",
      "first": "Croatian"
    },
    {
      "id": "ht",
      "first": "Haitian; Haitian Creole"
    },
    {
      "id": "hu",
      "first": "Hungarian"
    },
    {
      "id": "hy",
      "first": "Armenian"
    },
    {
      "id": "hz",
      "first": "Herero"
    },
    {
      "id": "ia",
      "first": "Interlingua (International Auxiliary Language Association)"
    },
    {
      "id": "id",
      "first": "Indonesian"
    },
    {
      "id": "ie",
      "first": "Interlingue; Occidental"
    },
    {
      "id": "ig",
      "first": "Igbo"
    },
    {
      "id": "ii",
      "first": "Sichuan Yi; Nuosu"
    },
    {
      "id": "ik",
      "first": "Inupiaq"
    },
    {
      "id": "io",
      "first": "Ido"
    },
    {
      "id": "is",
      "first": "Icelandic"
    },
    {
      "id": "it",
      "first": "Italian"
    },
    {
      "id": "iu",
      "first": "Inuktitut"
    },
    {
      "id": "ja",
      "first": "Japanese"
    },
    {
      "id": "jv",
      "first": "Javanese"
    },
    {
      "id": "ka",
      "first": "Georgian"
    },
    {
      "id": "kg",
      "first": "Kongo"
    },
    {
      "id": "ki",
      "first": "Kikuyu; Gikuyu"
    },
    {
      "id": "kj",
      "first": "Kuanyama; Kwanyama"
    },
    {
      "id": "kk",
      "first": "Kazakh"
    },
    {
      "id": "kl",
      "first": "Kalaallisut; Greenlandic"
    },
    {
      "id": "km",
      "first": "Central Khmer"
    },
    {
      "id": "kn",
      "first": "Kannada"
    },
    {
      "id": "ko",
      "first": "Korean"
    },
    {
      "id": "kr",
      "first": "Kanuri"
    },
    {
      "id": "ks",
      "first": "Kashmiri"
    },
    {
      "id": "ku",
      "first": "Kurdish"
    },
    {
      "id": "kv",
      "first": "Komi"
    },
    {
      "id": "kw",
      "first": "Cornish"
    },
    {
      "id": "ky",
      "first": "Kirghiz; Kyrgyz"
    },
    {
      "id": "la",
      "first": "Latin"
    },
    {
      "id": "lb",
      "first": "Luxembourgish; Letzeburgesch"
    },
    {
      "id": "lg",
      "first": "Ganda"
    },
    {
      "id": "li",
      "first": "Limburgan; Limburger; Limburgish"
    },
    {
      "id": "ln",
      "first": "Lingala"
    },
    {
      "id": "lo",
      "first": "Lao"
    },
    {
      "id": "lt",
      "first": "Lithuanian"
    },
    {
      "id": "lu",
      "first": "Luba-Katanga"
    },
    {
      "id": "lv",
      "first": "Latvian"
    },
    {
      "id": "mg",
      "first": "Malagasy"
    },
    {
      "id": "mh",
      "first": "Marshallese"
    },
    {
      "id": "mi",
      "first": "Maori"
    },
    {
      "id": "mk",
      "first": "Macedonian"
    },
    {
      "id": "ml",
      "first": "Malayalam"
    },
    {
      "id": "mn",
      "first": "Mongolian"
    },
    {
      "id": "mr",
      "first": "Marathi"
    },
    {
      "id": "ms",
      "first": "Malay"
    },
    {
      "id": "mt",
      "first": "Maltese"
    },
    {
      "id": "my",
      "first": "Burmese"
    },
    {
      "id": "na",
      "first": "Nauru"
    },
    {
      "id": "nb",
      "first": "Bokmål, Norwegian; Norwegian Bokmål"
    },
    {
      "id": "nd",
      "first": "Ndebele, North; North Ndebele"
    },
    {
      "id": "ne",
      "first": "Nepali"
    },
    {
      "id": "ng",
      "first": "Ndonga"
    },
    {
      "id": "nl",
      "first": "Dutch; Flemish"
    },
    {
      "id": "nn",
      "first": "Norwegian Nynorsk; Nynorsk, Norwegian"
    },
    {
      "id": "no",
      "first": "Norwegian"
    },
    {
      "id": "nr",
      "first": "Ndebele, South; South Ndebele"
    },
    {
      "id": "nv",
      "first": "Navajo; Navaho"
    },
    {
      "id": "ny",
      "first": "Chichewa; Chewa; Nyanja"
    },
    {
      "id": "oc",
      "first": "Occitan (post 1500)"
    },
    {
      "id": "oj",
      "first": "Ojibwa"
    },
    {
      "id": "om",
      "first": "Oromo"
    },
    {
      "id": "or",
      "first": "Oriya"
    },
    {
      "id": "os",
      "first": "Ossetian; Ossetic"
    },
    {
      "id": "pa",
      "first": "Panjabi; Punjabi"
    },
    {
      "id": "pi",
      "first": "Pali"
    },
    {
      "id": "pl",
      "first": "Polish"
    },
    {
      "id": "ps",
      "first": "Pushto; Pashto"
    },
    {
      "id": "pt",
      "first": "Portuguese"
    },
    {
      "id": "qu",
      "first": "Quechua"
    },
    {
      "id": "rm",
      "first": "Romansh"
    },
    {
      "id": "rn",
      "first": "Rundi"
    },
    {
      "id": "ro",
      "first": "Romanian; Moldavian; Moldovan"
    },
    {
      "id": "ru",
      "first": "Russian"
    },
    {
      "id": "rw",
      "first": "Kinyarwanda"
    },
    {
      "id": "sa",
      "first": "Sanskrit"
    },
    {
      "id": "sc",
      "first": "Sardinian"
    },
    {
      "id": "sd",
      "first": "Sindhi"
    },
    {
      "id": "se",
      "first": "Northern Sami"
    },
    {
      "id": "sg",
      "first": "Sango"
    },
    {
      "id": "si",
      "first": "Sinhala; Sinhalese"
    },
    {
      "id": "sk",
      "first": "Slovak"
    },
    {
      "id": "sl",
      "first": "Slovenian"
    },
    {
      "id": "sm",
      "first": "Samoan"
    },
    {
      "id": "sn",
      "first": "Shona"
    },
    {
      "id": "so",
      "first": "Somali"
    },
    {
      "id": "sq",
      "first": "Albanian"
    },
    {
      "id": "sr",
      "first": "Serbian"
    },
    {
      "id": "ss",
      "first": "Swati"
    },
    {
      "id": "st",
      "first": "Sotho, Southern"
    },
    {
      "id": "su",
      "first": "Sundanese"
    },
    {
      "id": "sv",
      "first": "Swedish"
    },
    {
      "id": "sw",
      "first": "Swahili"
    },
    {
      "id": "ta",
      "first": "Tamil"
    },
    {
      "id": "te",
      "first": "Telugu"
    },
    {
      "id": "tg",
      "first": "Tajik"
    },
    {
      "id": "th",
      "first": "Thai"
    },
    {
      "id": "ti",
      "first": "Tigrinya"
    },
    {
      "id": "tk",
      "first": "Turkmen"
    },
    {
      "id": "tl",
      "first": "Tagalog"
    },
    {
      "id": "tn",
      "first": "Tswana"
    },
    {
      "id": "to",
      "first": "Tonga (Tonga Islands)"
    },
    {
      "id": "tr",
      "first": "Turkish"
    },
    {
      "id": "ts",
      "first": "Tsonga"
    },
    {
      "id": "tt",
      "first": "Tatar"
    },
    {
      "id": "tw",
      "first": "Twi"
    },
    {
      "id": "ty",
      "first": "Tahitian"
    },
    {
      "id": "ug",
      "first": "Uighur; Uyghur"
    },
    {
      "id": "uk",
      "first": "Ukrainian"
    },
    {
      "id": "ur",
      "first": "Urdu"
    },
    {
      "id": "uz",
      "first": "Uzbek"
    },
    {
      "id": "ve",
      "first": "Venda"
    },
    {
      "id": "vi",
      "first": "Vietnamese"
    },
    {
      "id": "vo",
      "first": "Volapük"
    },
    {
      "id": "wa",
      "first": "Walloon"
    },
    {
      "id": "wo",
      "first": "Wolof"
    },
    {
      "id": "xh",
      "first": "Xhosa"
    },
    {
      "id": "yi",
      "first": "Yiddish"
    },
    {
      "id": "yo",
      "first": "Yoruba"
    },
    {
      "id": "za",
      "first": "Zhuang; Chuang"
    },
    {
      "id": "zh",
      "first": "Chinese"
    },
    {
      "id": "zu",
      "first": "Zulu"
    }
  ]
    

 
 
async selectsource(){
 let actionsheet = this.act.create({
    buttons:[
      {
        text: 'Use Library',
        handler: ()=>{
          this.gsetpicture(this.camera.PictureSourceType.PHOTOLIBRARY)
          
        }
      },
      {
        text: 'Camera',
        handler: ()=>{
          this.gsetpicture(this.camera.PictureSourceType.CAMERA)
          
        }
      }
    ]
  })

  ;(await actionsheet).present()
  
}


async Confirmcrop() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Crop?',
    message: 'More <strong>Accuracy</strong>',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
       
      }, {
        text: 'Yes',
        handler: () => {
         this.cropImage()
        }
      }
    ]
  });

  await alert.present();
}



 

cropImage(){
  this.crop.crop(this.imageText, {quality: 100})
  .then(
   this.imageText ,
    error => console.error('Error cropping image', error),
  );
 console.log(this.imageText)
 this.OCRImage()
}
//OCR GOOGLE ML
gsetpicture(sourceType: PictureSourceType){
  this.camera.getPicture({
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit:false,
    saveToPhotoAlbum: false,
    correctOrientation: true,
  
  }).then( (imageData) =>{
    //to OCR IMAGE URI 
    this.imageText = imageData

    //to Image
    this.Confirmcrop()
    //IMAGE URI TO URL BASE 64
    let filename = imageData.substring(imageData.lastIndexOf('/')+1)
    let path = imageData.substring(0,imageData.lastIndexOf('/')+1)
    this.file.readAsDataURL(path , filename).then((base64data)=> {this.selectedimage = base64data})
    console.log(this.selectedimage)
    console.log(imageData)
    this.OCRImage()
  })

}
//getimage prototype for tesseract
getpicture(sourceType){
  const cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: sourceType
  };

  this.camera.getPicture(cameraOptions)
  .then((captureDataUrl) => {
    this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
 }, (err) => {
     console.log(err);
 });
}  



//tesseract
reconizeimage(){
  Tesseract.recognize(this.selectedimage)
  .catch(err => console.error(err))
  .then(result => {
    this.imageText = (JSON.stringify(result))
  console.log(result)
})
    
    
}


 

OCRImage(){
  this.ocr.recText(OCRSourceType.NORMFILEURL, this.imageText)
  .then((res: OCRResult) => this.resocr = res)
  .catch((error: any) => console.log("error: " + error))
  this.ocrlenght = (JSON.stringify(this.resocr))
  

 
} 
  
OCRDatas(){

  this.blocks = (JSON.stringify(this.resocr['blocks']['blocktext']))
  this.blockres = JSON.parse(this.blocks)
  this.text = (JSON.stringify(this.resocr['lines']['linetext']))
  this.textres = JSON.parse(this.text)
  this.words= (JSON.stringify(this.resocr['words']['wordtext']))
  this.wordres = JSON.parse(this.words)
  console.log('text: '+ this.text)
  console.log('words: '+ this.words)
  console.log('blocks: ' + this.blocks)
}


playtext(){
  this.tts.speak(this.transresult)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
}


hide() {
  this.hideMe = true;
  
}

hider() {
  this.hiderMe = true;
  
}
hider1() {
  this.hiderMe = false;
  
}

hide1() {
  this.hideMe = false;
  this.repeat = true;
}
 
repeat1(){
  this.hideMe = true;
  this.repeat = false;
}


   
transAPI(){
  
  this.hideMe = false
  this.loader = true
  this.from=this.dialect.from['id']
  this.to= this.dialect.to['id']
 
  console.log(this.from)
  console.log(this.to)
  this.translateProvider.word = this.texttrans
  this.translateProvider.from = this.from
  this.translateProvider.to = this.to



 this.trigger_date()
  this.translateProvider.getTranslate().subscribe(async translateList  => {
    
    if( this.transresult = (JSON.stringify(translateList ['data']['translations']['0']['translatedText'] ))){
      this.loader = false
      this.hideMe = true

      this.tg = this.transresult.split('"').join("")
      
     

      //store to fire
      const translatelog = this.texttrans
      const translatefrom = this.dialect.from['first']
      const translateto = this.dialect.to['first']
      const translated = this.tg
      try {
      await this.afstore.collection('logs').doc(auth().currentUser.uid).update({
         translate: firestore.FieldValue.arrayUnion({
           translatelog ,
           translatefrom ,
           translateto,
           translated
          
         })
   
        })
      } catch (error) {
       
      }

    }
   
  } )



  
  
  //(JSON.stringify(result[0]['subAdministrativeArea']))) //  .subscribe(translateList  => this.transresult = (JSON.stringify(translateList['responseData']['translatedText'])))
 
  
}




transAPItrial(){
  
  this.hideMe = false
  this.trigger_date()
  this.from=this.dialect.from['id']
  this.to= this.dialect.to['id']
 
  console.log(this.from)
  console.log(this.to)
  this.translateProvider.word = this.texttrans
  this.translateProvider.from = this.from
  this.translateProvider.to = this.to
//error or empty
if(this.texttrans.length==0 || this.to.length ==0){
  console.log('empty text box')
  this.tg=""
  this.thoshow= false
 
  
}
//autodetect translation
if(this.from == "" && this.to.length>=2 && this.texttrans.length>=1){
  this.loader = true
  console.log("auto detect triggered")
  
  this.translateProvider.autoDetect().subscribe(async translateList  => {
    
    if( this.transresult = (JSON.stringify(translateList ['data']['translations']['0']['translatedText'] ))){
      this.loader = false
      this.hideMe = true

      this.removeruni= this.transresult.split('"').join("")
  this.tg = this.removeruni.split('&#39;').join("'").split('&quot;').join("''")
  this.tglenght =this.tg.length
      if(this.tglenght>0){
        this.thoshow= true
      }
      
     this.autodetect= (JSON.stringify(translateList ['data']['translations']['0']['detectedSourceLanguage']))
     

      //store to fire
      const translatelog = this.texttrans
      const translatefrom = "Auto Detect Language: " + this.autodetect
      const translateto = this.dialect.to['first']
      const translated = this.tg
      const date = this.tdate
      try {
      await this.afstore.collection('logs').doc(auth().currentUser.uid).update({
         translate: firestore.FieldValue.arrayUnion({
           translatelog ,
           translatefrom ,
           translateto,
           translated,
           date
           
           
          
         })
   
        })
      } catch (error) {
       
      }
 
    }
   
  } )
//end of autodetect
}
//all fields are up
if(this.from.length>=1 && this.to.length>=1 && this.texttrans.length>=1){
  this.loader = true
  console.log('all good')
  this.translateProvider.getTranslate().subscribe(async translateList  => {
    
    if( this.transresult = (JSON.stringify(translateList ['data']['translations']['0']['translatedText'] ))){
      this.loader = false
      this.hideMe = true

      this.tg = this.transresult.split('"').join("")
      this.tglenght =this.tg.length
      if(this.tglenght>0){
        this.thoshow= true
      }
      
     

      //store to fire
      const translatelog = this.texttrans
      const translatefrom = this.dialect.from['first']
      const translateto = this.dialect.to['first']
      const translated = this.tg
      const date = this.tdate
      try {
        console.log('transferingdata')
      await this.afstore.collection('logs').doc(auth().currentUser.uid).update({
         translate: firestore.FieldValue.arrayUnion({
           translatelog ,
           translatefrom ,
           translateto,
           translated,
           date
          
         })
        
        })
        console.log('transfered')
      }
       catch (error) {
       
      }

    }
   
  } )
}


 
  

  //(JSON.stringify(result[0]['subAdministrativeArea']))) //  .subscribe(translateList  => this.transresult = (JSON.stringify(translateList['responseData']['translatedText'])))
 
  
}



public swapValues1() {
  
 
console.log(this.dialect.to['id'])
console.log(this.dialect.to['first'])
console.log(this.dialect.from)
  


  this.fromswitch = this.dialect.from
  this.dialect.from= this.dialect.to
  this.dialect.to = this.fromswitch
 
}
public trigger_date() {
  const months = ["Jan","Feb","Mar","Arp","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]
  var dt= new Date()
  var formated_date = dt.getDate() + "-" + months[dt.getMonth()]+ "-"+ dt.getFullYear()

  var hour = dt.getHours()
  var min = dt.getMinutes()
  var ampm = hour>= 12? 'pm' : 'am'
  hour = hour % 12
  hour = hour ? hour : 12
  min = min < 10 ? 0 + min: min
  var time = hour + ':' + min + ampm

  var get_time = formated_date +' '+ time
     
    
   
    this.tdate = get_time
    


  

  dt.getTime()
  console.log( this.tdate)
  
 

  
  
}
rotate(){
  var  abox = document.getElementsByClassName("rotate")[0];      
       abox.classList.toggle("tilt");
       abox.classList.remove("tilt");

}



}