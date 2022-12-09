import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
 
  constructor(private route: ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        //console.log(this.editMode);
      }
    );
  }

  onSubmit()
  {
    const newRecipe =new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);
    if(this.editMode)
    {
    this.recipeService.UpdateRecipe(this.id,newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern("^[1-9]+[0-9]*$")])
    }));
  }

  onDeleteIngredient(index:number)
  {
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel()
  {
   this.router.navigate(['../'],{relativeTo:this.route});
  }

  private initForm() {
   
    let recipeName = '';
    let recipeImagePath='';
    let recipeDesction='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode)
    {
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDesction=recipe.description;
      if(recipe['ingredients'])
      {
      for(let ingredient of recipe.ingredients)
      {
       recipeIngredients.push(
        new FormGroup({
          'name':new FormControl(ingredient.name),
          'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern("^[1-9]+[0-9]*$")])
        })
       );
      }
      }
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDesction,Validators.required),
      'ingredients':recipeIngredients
      });
  }

}
