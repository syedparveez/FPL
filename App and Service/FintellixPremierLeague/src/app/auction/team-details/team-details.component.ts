import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FplService } from 'src/app/shared/fpl-service';
import { ITeamDetails, ITeamList } from 'src/app/shared/FPL.model';

@Component({
  selector: 'fpl-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamId:number;
  teamDetails:ITeamDetails;
  allTeamList:ITeamList[];

  constructor(private route: ActivatedRoute, private fplService: FplService ) { }

  ngOnInit() {
    this.route.params.forEach((params:Params) =>{
      this.fplService.getTeamDetailsByID(+params['id']).subscribe((teamDetails: ITeamDetails) => {
        this.teamDetails = teamDetails;
        }) 
      this.fplService.getTeamList().subscribe((allTeamList: ITeamList[]) => {
        this.allTeamList = allTeamList;
        }) 
      
    })
  }
}
