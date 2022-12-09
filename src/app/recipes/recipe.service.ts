import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
// import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
 recipesChanged=new Subject<Recipe[]>();
 //  recipeSelected=new EventEmitter<Recipe>();
 //  recipeSelected=new Subject<Recipe>();

//    private recipes:Recipe[]=[
//         new Recipe('a test recipe',
//         'test',
//         'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png',
//         [new Ingredient('meat',1),
//         new Ingredient('frice',10)]),
//         new Recipe('this is test2 recipe',
//         'test2',
//         'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png',
//         [new Ingredient('bun',2),
//         new Ingredient('Meat',1)])
//     ];

private recipes:Recipe[]=[];

constructor(private slservice:ShoppingListService){}

setRecipes(recipes:Recipe[])
{
 this.recipes=recipes;
 this.recipesChanged.next(this.recipes.slice());
}

    getRecipes()
    {
        return this.recipes.slice();
    }  
    getRecipe(index:number)
    {
   return this.recipes.slice()[index];
    }

    onAddIngredientsToShoppingList(ingredients:Ingredient[])
    {
    this.slservice.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe)
    {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    }
    UpdateRecipe(index:number,newRecipe:Recipe)
    {
     this.recipes[index]=newRecipe;
     this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number)
    {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
    }

}