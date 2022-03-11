import { Component, OnInit } from '@angular/core';
import { auth, User, firestore, database } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '../user.service';


import { Router } from '@angular/router';


//import { PowpoverComponent } from '../../component/popover/popover.component';

//import {Platform , ToastController} from '@ionic/angular';
import {ToastAllert} from "../toast"
import * as firebase from 'firebase'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  prof
  profdata
  prol
  profcard
  profs
  uiddata
  verification
 
  strin : string
  phonenum : number = 639771053480
  recap 

  confirmationResult;
  otpSent = true;
  
  dataholder
  useremail : string = ''
  emailverified = false
  notverified= true

  //changepass
  confirmedpass = false
  notconfirmedpass = false

  password :string = ""
  newpassword :string = ""
  repassword :string = ""
  pass: string = ''

  //editprofile
  edit = false
  c_edit =true
  c_fname :string = ''
  c_lname :string = ''
  c_username :string = ''
  c_email :string = ''
  c_password: string = ''


  constructor(
    private afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    private toast: ToastAllert,
    private router:Router,
  //  public popoverController: PopoverController
    
  ) {
      this.dataholder =  this.afauth.authState
     
      this.dataholder.subscribe(async data => {
      console.log(data)
      this.verification = data.email
      if(data.emailVerified == true){
        
      this.notverified = false
      this.emailverified = true
    }
  })


    this.afauth.authState.subscribe(async datauid => {
      this.uiddata = datauid.uid

      this.prof = this.afstore.doc('users/' + this.uiddata)
      this.prof.valueChanges().subscribe(data => {
      this.profdata = data

        this.profs=this.profdata
        
        //foredit profile
        this.c_email = this.profs.Email
        this.c_fname = this.profs.FirstName
        this.c_lname = this.profs.LastName
        this.c_username = this.profs.Username

        
        this.prol=this.profs['FirstName'].length
        if(this.prol>0){
          this.profcard = true
        }
        console.log(data.Email  + " DATA")
      })
    })
   }

  ngOnInit() {
   
  }

  

  topic(){
    this.router.navigateByUrl('/f-pass');
  }

   async test(){
    this.toast.verif = this.verification
    
    try {
      await this.afauth.auth.currentUser.sendEmailVerification()
      this.toast.verify()
    } catch (error) {
      console.dir(error)
          if(error.code == 'auth/too-many-requests'){
            this.toast.verificationerror()
          }
    }
    
  }

 async savechanges(){
  try {
    await  this.afauth.auth.signInWithEmailAndPassword(this.profs.Email,this.c_password)
        try {

          await this.afstore.collection('users').doc(auth().currentUser.uid).update({
           LastName: this.c_lname ,
           FirstName: this.c_fname ,
           Username : this.c_username,
           Email: this.c_email,
           })
  
        this.afauth.auth.currentUser.updateEmail(this.c_email)
        this.c_edit = true
        this.edit = false
      
          
        } catch (error) {
          
        }

    } catch (error) {
      console.dir(error)
      if(error.code == 'auth/wrong-password'){
        this.toast.wrongpassword()
      }
    }

  }



  // await this.afstore.collection('users').doc(auth().currentUser.uid).update({
  //   LastName: this.c_lname ,
  //   FirstName: this.c_fname ,
  //   Username : this.c_username,
  //   Email: this.c_email,
  //   //uid: cred.user.uid,
        
   
  // })
  
  // this.afauth.auth.currentUser.updateEmail(this.c_email)
  //       console.log(this.c_fname)
      

//confirms old password
 async Changepass(){
    try {
    await  this.afauth.auth.signInWithEmailAndPassword(this.profs.Email,this.password)
    this.notconfirmedpass = false
    this.confirmedpass = true
    } catch (error) {
      console.dir(error)
      if(error.code == 'auth/wrong-password'){
        this.toast.wrongpassword()
      }
    }
  }

//enter newpassword
  async newpass(){
     try {
       if(this.newpassword === this.repassword){
        
      await  this.afauth.auth.currentUser.updatePassword(this.newpassword)
        this.confirmedpass = false
        this.notconfirmedpass = true
        this.repassword=''
        this.newpassword=''
        this.password=''
       }

       if(this.newpassword != this.repassword){
        console.log('password not same')
      }
       
     } catch (passerr) {
       if(passerr.code == 'auth/weak-password'){
         this.toast.weakpassword()
       }
     }
   }
  
  


  


  signinwithphone(){
    
    this.recap  =new firebase.auth.RecaptchaVerifier('sign-in-button');
    //this.recap = false
    firebase.auth().signInWithPhoneNumber("+639171930617" , this.recap)
    .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    this.confirmationResult = confirmationResult;
    this.otpSent = true;
    console.log (this.otpSent)
    }).catch(err => {
    console.log(err)
    })
  }


  editprofile(){
    this.edit= true
    this.c_edit = false
  }

  cancelprofile(){
    this.edit= false
    this.c_edit = true
  }
  cancelpass(){
    this.repassword=''
    this.newpassword=''
    this.password=''
    this.notconfirmedpass = false
    this.confirmedpass = false
    this.profcard = true
  }

  cpcard(){
    if(this.notconfirmedpass == true){
      this.notconfirmedpass = false
      
    }

      else{
      this.notconfirmedpass = true
      this.profcard = false
        
    }
  }
 
}
