import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { Component, OnInit, AfterContentInit, AfterViewInit,OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';







const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule implements OnInit, AfterContentInit, AfterViewInit,OnDestroy { constructor(public menuCtrl: MenuController ) {}

ionViewWillEnter() {
  this.menuCtrl.enable(false);
 }
ngOnInit() {
  this.menuCtrl.enable(false);
  this.menuCtrl.swipeEnable(false);
}
ngAfterContentInit()  {
  this.menuCtrl.enable(false);
  this.menuCtrl.swipeEnable(false);
}
ngAfterViewInit() {
  this.menuCtrl.enable(false);
  this.menuCtrl.swipeEnable(false);
}
ngOnDestroy() {
  this.menuCtrl.enable(true);
  this.menuCtrl.swipeEnable(true);
}


}

