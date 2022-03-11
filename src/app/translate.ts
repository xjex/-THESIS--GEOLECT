import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';

const API: string = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDCleZXzKs1ef5vMGuZOyXsduJMaKlPS5k"

export enum words{
 
}

@Injectable()
export class TranslateProvider{
from: string =''
to :string = ''
word :string = ''

    constructor(public http: HttpClient){
        console.log('Working translation');
    }
    getTranslate(){
        return this.http.get(API + '&q=' + this.word +'&source='+this.from+'&target=' +this.to) ;
    }

    autoDetect(){
        return this.http.get(API + '&q=' + this.word +'&target=' +this.to) ;
    }
}
