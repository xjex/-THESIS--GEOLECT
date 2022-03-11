import { Injectable }   from '@angular/core'
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


interface user {
    email: string;
    name: string
    lname: string
    
    uid: string
}

@Injectable()

export class UserService{
    uiddata
    uidget = this.uiddata;
    u_pass :string = ''
    private user: user

    constructor(private afs: AngularFirestore,
                private afauth: AngularFireAuth){

    }
    create_NewUser(record) {
        return this.afs.collection('users').add(record);
    }

    setUser(user){
        this.user = user
    }
    
    getUID(){
        this.afauth.authState.subscribe(async datauid => {
            this.uiddata = datauid.uid
            console.log(datauid.uid)
            return console.log(datauid.uid)
            })

            

       
    }
}