import {Component, OnInit} from "@angular/core";
import {Activity} from "../../models/activity.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity-journal',
  templateUrl: './activity-journal.component.html',
  styleUrls: ['./activity-journal.component.css']
})

export class ActivityJournalComponent implements OnInit {
  objActivity: Activity = new Activity();
  activities: Activity[] = [];
  constructor(private database: DatabaseServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.selectAllFood()
      .then(data=> {
        this.activities=data;
        console.info(data);
      })
      .catch(err =>{
        console.error(err);
      })
  }

  btnAdd_click() {
    this.database.insertActivity(this.objActivity, () => (
      console.log("Activity record added successfully")
    ));
    alert("Record added successfully");
  }
  btnDelete_click(activity: any){
    this.database.deleteActivity(activity, ()=>{
      alert("Food deleted successfully.");
    });
  }
}
