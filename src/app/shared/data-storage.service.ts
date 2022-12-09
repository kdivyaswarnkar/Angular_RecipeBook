import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
 constructor(private http:HttpClient,private recipesService:RecipeService){}
 storeRecipes()
 {
 const recipes=this.recipesService.getRecipes();
 this.http.put('https://ng-recipe-book-6d8e4-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
    console.log(response);
 });
 }
 fetchRecipes()
 {
  return  this.http.get<Recipe[]>('https://ng-recipe-book-6d8e4-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes=>{return recipes.map(recipe=>{
      return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]};
    });}),tap(recipes => {
      this.recipesService.setRecipes(recipes);
    })
    )
 }
}