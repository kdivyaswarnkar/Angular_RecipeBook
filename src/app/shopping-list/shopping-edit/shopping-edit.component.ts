import { ViewChild } from '@angular/core';
// import { EventEmitter } from '@angular/core';
// import { Output } from '@angular/core';
//import { ElementRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
// @ViewChild('nameInput') nameInputRef :ElementRef;
// @ViewChild('amountInput') amountInputRef :ElementRef;
//@Output() ingredientAdded=new EventEmitter<Ingredient>();
@ViewChild('f') slForm:NgForm;
subscription:Subscription;
editMode=false;
editedIttemIndex:number;
editedItem:Ingredient;
  constructor(private slService:ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  this.subscription=  this.slService.startedEditing.subscribe(
    (index:number)=>{
      this.editedIttemIndex=index;
     this.editMode=true;
     this.editedItem=this.slService.getIngredient(index);
     this.slForm.setValue({
      name:this.editedItem.name,
      amount:this.editedItem.amount
     })
    }
  );
  }
  onSubmit(form:NgForm)
  {
    const value=form.value;
  //  const ingAmount = this.amountInputRef.nativeElement.value;
  //  const ingName = this.nameInputRef.nativeElement.value;
   const newingredient = new Ingredient(value.name, value.amount);
  if(this.editMode)
  {
   this.slService.updateIngredient(this.editedIttemIndex,newingredient);
  }
  else{
    this.slService.addIngredient(newingredient)
  }
  this.editMode=false;
  form.reset();
  
  // this.ingredientAdded.emit(ingredient);
  }

  onClear()
  {
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete()
  {
    this.slService.deleteIngredient(this.editedIttemIndex);
    this.onClear();
  }
}
