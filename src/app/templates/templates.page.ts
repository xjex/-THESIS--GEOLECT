import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth, User, firestore, database } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from '../user.service';

import { Observable, observable } from 'rxjs'
import { JsonPipe } from '@angular/common';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

import {ToastAllert} from "../toast"


@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
fave
rev_fav
showfave
uiddata

  constructor( private afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router,
    public toaster:ToastAllert) 

      {
        this.afauth.authState.subscribe(async datauid => {
          this.uiddata = datauid.uid
          console.log(datauid.uid)
           //phrasebook datas
           this.fave = this.afstore.doc('liked/' + this.uiddata)
           this.fave.valueChanges().subscribe(favevent => {
             //this.translate = event.translate
             //reverse the logs
             this.rev_fav = favevent.translate
             this.showfave = this.rev_fav.reverse()
             console.log("This is liked" + favevent)
           })
          })
    
         
    
         
      }
    
      ngOnInit() {
    
      }
    
      async del_pb(log) {
        try {
          console.log(log);
          await this.afstore.doc('liked/' + this.uiddata).update({
            'translate': firebase.firestore.FieldValue.arrayRemove({
              'translated': log.translated,
              'translatefrom': log.translatefrom,
              'translatelog': log.translatelog,
              'translateto': log.translateto,
              'date':log.date
            })
          })
          this.toaster.deletedlogs()
          // console.log(i)
        } catch (error) {
          console.log(error)
    
        }
      }
}


