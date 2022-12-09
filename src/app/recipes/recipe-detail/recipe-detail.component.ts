//import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   // const id=this.route.snapshot.params['id'];
   this.route.params.subscribe((params:Params)=>{
    console.log(this.id);
this.id=+params['id'];
console.log(this.id);
this.recipe=this.recipeService.getRecipe(this.id);
   });
  }
  onAddToShoppingList()
  {
this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe()
  {
   this.router.navigate(['edit'],{relativeTo:this.route})
   //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
