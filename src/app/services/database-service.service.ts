import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Food } from '../models/food.model';
//import { Activity } from '../models/activity.model';



declare function openDatabase(shortName: string, version: string, displayName: string,
                              dbSize: number, dbCreateSuccess: () => void): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  private db: any = null;

  constructor() { }

  private static errorHandler(error: string): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "FitnessTrackerDB";
    let version = "1.0";
    let displayName = "DB for FitnessTracker App";
    let dbSize = 2 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {
    function txFunction(tx: any): void {
      var options: string[] = [];
      var sql: string = "CREATE TABLE IF NOT EXISTS users(" +
        " userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userName VARCHAR(40) NOT NULL UNIQUE," +
        " firstName VARCHAR(40) NOT NULL," +
        " lastName VARCHAR(40)," +
        " userHeight DOUBLE NOT NULL," +
        " userWeight DOUBLE NOT NULL," +
        " userGoalWeight DOUBLE NOT NULL," +
        " dateCreated DATE NOT NULL);";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table users successful");
      }, DatabaseServiceService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS food(" +
        " foodId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " foodName VARCHAR(60) NOT NULL," +
        " calories DOUBLE NOT NULL," +
        " fatGrams DOUBLE NOT NULL," +
        " carbGrams DOUBLE NOT NULL," +
        " proteinGrams DOUBLE NOT NULL," +
        " userId INTEGER NOT NULL," +
        " FOREIGN KEY(userId) REFERENCES users(userId));";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table food successful");
      }, DatabaseServiceService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS activities(" +
        " foodId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " foodName VARCHAR(60) NOT NULL," +
        " calories DOUBLE NOT NULL," +
        " fatGrams DOUBLE NOT NULL," +
        " carbGrams DOUBLE NOT NULL," +
        " proteinGrams DOUBLE NOT NULL," +
        " userId INTEGER NOT NULL," +
        " FOREIGN KEY(userId) REFERENCES users(userId));";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table activities successful");
      }, DatabaseServiceService.errorHandler);

    }
    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.log("Success: All tables created successfully");
    });
  }

  public insertUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO users(userName, firstName, lastName, userHeight, userWeight, userGoalWeight, dateCreated) VALUES (?,?,?,?,?,?,?)";
      let options = [user.userName, user.firstName, user.lastName, user.userHeight, user. userWeight, user.userGoalWeight, user.dateCreated];

      tx.executeSql(sql, options, () => {
        console.info("Success: insert user record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info("Success: insert user record successful");
    });
  }

  public insertFood(food: Food, callback: any){
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO foods(foodName, calories, fatGrams, carbGrams, proteinGrams, userId) VALUES (?, ?, ?, ?, ? , ?)";
      let options = [food.foodName, food.calories, food.fatGrams, food.carbGrams, food.proteinGrams, food.userId];

      tx.executeSql(sql, options, () => {
        console.info("Success: food user record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info("Success: food user record successful");
    });
  }

  public selectUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "SELECT * FROM users WHERE userName=?;";
      let options = [user.userName];

      tx.executeSql(sql, options, () => {
        console.info("Success: select user record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info(`Success: select ${user.userName}'s user record successful`);
    });
  }

  public selectAllUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "SELECT * FROM users;";
      let options = [user.userName];

      tx.executeSql(sql, options, () => {
        console.info("Success: select user record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info(`Success: select ${user.userName}'s user record successful`);
    });
  }

  public deleteUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "DELETE FROM users WHERE userName=?;";
      let options = [user.userName];

      tx.executeSql(sql, options, () => {
        console.info("Success: delete user record successful");
      }, DatabaseServiceService.errorHandler);
    }
  }

  public updateUser(user: User, callback: any) {
      function txFunction(tx: any) {
        let sql: string = "UPDATE users SET userName=?, firstName=?, lastName=?, userHeight=?, userWeight=?" +
          "userGoalWeight=?;";
        let options = [user.userName, user.firstName, user.lastName, user.userHeight, user.userWeight, user.userGoalWeight];

        tx.executeSql(sql, options, () => {
          console.info("Success: delete user record successful");
        }, DatabaseServiceService.errorHandler);
      }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info(`Success: select ${user.userName}'s user record successful`);
    });
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        this.createDatabase();
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }
}
