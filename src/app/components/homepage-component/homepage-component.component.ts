import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { DatabaseServiceService } from "../../services/database-service.service";
import { Router } from "@angular/router";
import { NetIntakesService } from "../../services/net-intakes.service";
import { GoalsService } from "../../services/goals.service";
declare const $: any;

@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})

export class HomepageComponentComponent implements OnInit {

  constructor(private router: Router,
              private database: DatabaseServiceService,
              private goalsService: GoalsService,
              private netIntakes: NetIntakesService
  ) {
  }

  users: User[] = [];
  user: User = new User();
  foods: any[] = [];
  activities: any[] = [];
  id: number = -1;

  date: Date = new Date();
  currentDate: string = this.date.toDateString();

  netCaloriesTarget: number = -1;
  goalProteinIntake: number = -1;

  caloriesIn: number = -1;
  caloriesOut: number = -1;
  proteinIn: number = -1;
  netCalories: number = -1;

  ngOnInit(): void {
    this.database.initDB();

    let tempId: any = localStorage.getItem('userId') || '1';
    this.id = parseInt(tempId);

    this.database.selectAllUser()
      .then((data: any) => {
        this.users = data;
        this.user = this.users[this.id - 1];
      }).catch((e: any) => {
      console.error(e);
    });

    /*
    this.database.selectFoodByDate()
      .then((data: any)=> {

        this.foods = data;

      }).catch((e: any)=> {
      console.error(e);
      });*/

    /*
    this.database.selectActivitiesByDate()
      .then((data: any)=> {
        this.activities = data;
      }).catch((e: any)=> {
      console.error(e);

    });
  */
    this.netCaloriesTarget = this.goalsService.calcNetCalorieGoal(
      this.user.userGoalWeight, this.user.userWeight, this.user.userHeight, this.user.userGender);
    this.goalProteinIntake = this.goalsService.calcProteinGoals(this.user.userWeight);

    this.caloriesIn = this.netIntakes.calculateTotalCaloriesIn(this.foods);
    this.caloriesOut = this.netIntakes.calculateTotalCaloriesOut(this.activities);
    this.proteinIn = this.netIntakes.calculateTotalProteinIn(this.foods)
    this.netCalories = this.netIntakes.calculateNetCalories(this.foods, this.activities)


  }

  btnChangeWeight_click() {
    this.user.userWeight = $("#txtWeight").val();
    this.database.updateUser(this.user, () => {
      console.info("Weight updated successfully");
    });
    this.ngOnInit();
  }

  btnLogout_click() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
