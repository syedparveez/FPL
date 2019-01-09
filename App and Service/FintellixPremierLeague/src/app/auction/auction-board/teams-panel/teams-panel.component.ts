import { Component, OnInit } from '@angular/core';
import { FplService } from 'src/app/shared/fpl-service';
import { ITeamDetails, ITeamList } from 'src/app/shared/FPL.model';

@Component({
  selector: 'fpl-teams-panel',
  templateUrl: './teams-panel.component.html',
  styleUrls: ['./teams-panel.component.css']
})
export class TeamsPanelComponent implements OnInit {
   allTeamDetails: ITeamDetails[];
   allTeamList: ITeamList[];
  constructor(private fplService: FplService) { }

  ngOnInit() {
    this.fplService.getAllTeamDetails().subscribe((allTeamDetails: ITeamDetails[]) => {
    this.fplService.UpdateGlobalAllTeam(allTeamDetails);
    this.allTeamDetails = this.fplService.getUpdatedGlobalAllteam();
    }) 

    this.fplService.getTeamList().subscribe((allTeamList: ITeamList[]) => {
      this.fplService.updateTeamList(allTeamList);
      this.allTeamList = this.fplService.getUpdatedTeamList();
    })
  }

}
