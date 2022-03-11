import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string = '';
  lname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  rpassword: string = '';
  defaultphoto: string = 'https://firebasestorage.googleapis.com/v0/b/geolect-login.appspot.com/o/logo.png?alt=media&token=36d2499e-aa9b-4a46-8cde-501e961b059f'
  constructor(public afAuth: AngularFireAuth, 
              public menu: MenuController,
              public afstore: AngularFirestore,
              public user: UserService,
             
             
              private alertcont: AlertController,
              private router: Router) { }

  ngOnInit() {
  }



  tryRegister() {
    if(this.password !== this.rpassword){
      return console.error("Password dont match")
    }
    try {

      

      auth().createUserWithEmailAndPassword(this.email , this.password)
			.then( 
        
        cred => {
        
        this.userprof()
        this.afstore.collection('users').doc(cred.user.uid).set({
          LastName: this.lname ,
          FirstName: this.name ,
          Username : this.username,
          Email: this.email,
          uid: cred.user.uid,
          PhotoUrl : this.defaultphoto
         
         
        })
          
        this.afstore.collection('translate').doc(cred.user.uid).set({
          Username : this.username,
          uid: cred.user.uid,
        })

        this.afstore.collection('logs').doc(cred.user.uid).set({
          Username : this.username,
          uid: cred.user.uid,
        })

        this.afstore.collection('liked').doc(cred.user.uid).set({
          Username : this.username,
          uid: cred.user.uid,
        })
        console.log('ok')
  
        
			}, err => {
				console.log(err.code);
        if(err.code === 'auth/invalid-email'){
          console.log('error email')
        }
        if(err.code ==='auth/weak-password'){
          console.log('weak')
        }
        if(err.code === 'auth/email-already-in-use'){
          console.log('emai already used')
        }
        
      })
      
    }
    
    
    catch (error) {
      console.dir(error.code)
      if(error.code === "auth/weak-password"){
        console.log("WEAK PASSWORD")
   
        this.alertcont.create({
         header: 'WEAK PASSWORD',
         message: 'Please Enter Strong Password',
         buttons: ['Ok']
       }).then(alert => {
         alert.present();
       });
       //
       }

       if(error.code === "auth/invalid-email"){
         console.log('Invalid Email ')
       }
      
      
    }

    
		
	}


login(){
  this.router.navigateByUrl('/login')
}

async reg(){
  const {name , lname , email, username,password,rpassword}= this
  
  
  try {
    const res =await this.afAuth.auth.createUserWithEmailAndPassword(email , password)
    console.log(res)

    this.afstore.doc(`users/${ res.user.uid }`).set({
      username,
      
    }) 

    this.user.setUser({
      username,
      uid: res.user.uid
    })




    

  } catch (error) {
   
  }
 
}

async userprof(){
  const user = this.afAuth.auth.currentUser
   await user.updateProfile({
    displayName: this.username,
    photoURL:  this.defaultphoto,
    

  
  })
}


}
