import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';

const API: string = "https://api.dictionaryapi.dev/api/v2/entries/en/tide"

export enum words{
 
}

@Injectable()
export class DictionaryProvider{
from: string =''
word :string = ''

    constructor(public http: HttpClient){
        console.log('Working Dictionary');
    }
    getTranslate(){
        return this.http.get(API + '/'+this.from+'/' + this.word );
    }
}
