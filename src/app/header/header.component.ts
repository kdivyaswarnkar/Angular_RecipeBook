import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy
{
  isAuthenticated=false;
 user: User;
  private usersub:Subscription;
 //@Output() featureSelected=new EventEmitter<string>();
  // onSelect(feature:string)
  // {
  //   this.featureSelected.emit(feature);
  // }

  constructor(private dataStorageService:DataStorageService,private authService:AuthService){}
  ngOnDestroy(): void {
   this.usersub.unsubscribe();
  }

 ngOnInit(): void {
//  this.usersub=  this.authService.user.subscribe(user=>{
//   this.isAuthenticated=!!user;
//   console.log(!user);
//   console.log(!!user);
//  });
 //this.usersub = this.authService.user.subscribe(user => this.user = user);
 console.log(this.isAuthenticated);
 this.usersub = this.authService.user.subscribe(user => {
   console.log(user);
   this.isAuthenticated = !user ? false : true; // !!user;
   console.log(!user);
   console.log(!!user);
 });
 }

  onSaveData()
  {
   this.dataStorageService.storeRecipes();
  }

  onLogout()
  {
    this.authService.logout();
  }

  onFetchData()
  {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}