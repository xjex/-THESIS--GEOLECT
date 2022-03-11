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
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  userlog$: Observable<any[]>;
  uiddata
  userlog
  sub
  reverse
  rev_fav
  fave
  showfave
  translate
  translateto
  index: boolean = true
  deleteme
  prof
  profdata
  profs: string = ''
  prol
  profcard = false


  logcard = true;
  profilecard=false;
  likedcard= false;

  constructor(
    private afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router,
    public toaster:ToastAllert

  ) 
  {
    this.afauth.authState.subscribe(async datauid => {
      this.uiddata = datauid.uid
      console.log(datauid.uid)

      this.sub = this.afstore.doc('logs/' + this.uiddata)
      this.sub.valueChanges().subscribe(event => {
        //this.translate = event.translate
        //reverse the logs
        this.reverse = event.translate
        this.translate = this.reverse.reverse()
        console.log(event)
      })

     

        //name
      this.prof = this.afstore.doc('users/' + this.uiddata)
      this.prof.valueChanges().subscribe(data => {
      this.profdata = data

        this.profs=this.profdata
        this.prol=this.profs['FirstName'].length
        if(this.prol>0){
          this.profcard = true
        }
        console.log(data.FirstName + " DATA")
      })
    })
  }

  ngOnInit() {

  }

  async del(log) {
    try {
      console.log(log);
      await this.afstore.doc('logs/' + this.uiddata).update({
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


  async delall(log) {
    try {
      console.log(log);
      await this.afstore.doc('logs/' + this.uiddata).update({
        'translate': firebase.firestore.FieldValue.delete()
      })
      this.toaster.deletedlogs()
      // console.log(i)
    } catch (error) {
      console.log(error)

    }
  }


  async liked(log) {
    try {
      console.log(log)
      await this.afstore.collection('liked').doc(auth().currentUser.uid).update({
        translate: firestore.FieldValue.arrayUnion({
          'translated': log.translated,
          'translatefrom': log.translatefrom,
          'translatelog': log.translatelog,
          'translateto': log.translateto,
          'date':log.date       
         })
   
        })
        this.toaster.savelog()

    } catch (error) {
      console.log(error)

    }
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






toprofile(){
  this.router.navigateByUrl('/profile');
}


log_card(){
  this.profilecard= false
  this.logcard = true
  this.likedcard = false
}

liked_card(){
  this.likedcard = true
  this.profilecard = false
  this.logcard= false
}



}
