import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponentComponent } from "./components/about-component/about-component.component";
import { ActivityJournalComponent } from "./components/activity-journal/activity-journal.component";
import { FoodJournalComponent } from "./components/food-journal/food-journal.component";
import { HomepageComponentComponent } from "./components/homepage-component/homepage-component.component";
import { LoginComponentComponent } from "./components/login-component/login-component.component";

const routes: Routes = [

  {path:'', component: LoginComponentComponent},
  {path:'login', component: LoginComponentComponent},
  {path:'about', component: AboutComponentComponent},
  {path:'activity', component: ActivityJournalComponent},
  {path:'home', component: HomepageComponentComponent},
  {path:'food', component: FoodJournalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
