import { Component, OnInit } from '@angular/core';
import { FplService } from 'src/app/shared/fpl-service';
import { FormControl, FormGroup} from '@angular/forms'
import { IPlayerInfo, ITeamList, IUndo } from 'src/app/shared/FPL.model';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
@Component({
  selector: 'fpl-auction-panel',
  templateUrl: './auction-panel.component.html',
  styleUrls: ['./auction-panel.component.css']
})
export class AuctionPanelComponent implements OnInit {
  firstBid: boolean;
  viewAllFlag: boolean;
  player:IPlayerInfo;
  addedPlayer: IPlayerInfo;
  auctionablePlayers: IPlayerInfo[];
  allTeamList:ITeamList[];
  abcd:any;
  auctionIdForm:FormGroup;
  currentBidderClr: string;
  currentBidderId:number;
  currentBiddingAmount: number;
  undo: IUndo = {
    TeamID: null,
    PlayerID: null,
    isActive: false
  };
  shortTeamsName: string[];
  constructor(private fplService: FplService) {
   }

  ngOnInit() {
    let auctionId =  new FormControl();
    this.auctionIdForm = new FormGroup({
      auctionId: auctionId
    })
    this.currentBidderClr = "";
    this.currentBidderId = null;
  }

  GetPlayerForAuction(formValues){
    this.fplService.getPlayerForAuctionById(+formValues.auctionId).subscribe((playerInfo: IPlayerInfo) => {
      this.player = playerInfo;
      this.currentBiddingAmount = playerInfo.BasePrice;
      this.currentBidderClr = "";    
    }) 
    this.allTeamList = this.fplService.getUpdatedTeamList();
    this.shortTeamsName = [];
    this.allTeamList.forEach(team => {
      var name = team.TeamName.split(' ');
      var abbrivation="";
      for (var i = 0; i < name.length; i++){
        abbrivation = abbrivation + name[i].substr(0,1);
      }            
      this.shortTeamsName.push(abbrivation);
    });
    this.auctionIdForm.get('auctionId').setValue("");
    this.firstBid = true;
    this.viewAllFlag = false;
  }

  addPlayer(formValues){
    if(this.currentBidderId != null){
      this.fplService.addPlayerToTeam(this.currentBidderId,this.player.PlayerID,this.currentBiddingAmount).subscribe(() => {
        this.fplService.updateAllTeamDetails(this.currentBidderId,this.player);
        this.undo.TeamID = this.currentBidderId;
        this.undo.PlayerID = this.player.PlayerID;
        this.player = null;
        this.currentBidderClr = "";
        this.currentBidderId = null;
        this.currentBiddingAmount = null;
        this.firstBid = false;
      });
    }
  }

  currentBidder(className: string, teamId: number){
    this.currentBidderClr = className;
    this.currentBidderId = teamId;
    this.undo.isActive = true;
    if ((this.currentBiddingAmount != this.player.BasePrice) || (!this.firstBid)){
      switch (true){
        case (this.currentBiddingAmount < 30) : 
          this.currentBiddingAmount += 2;
          break;
        case (this.currentBiddingAmount < 40) : 
          this.currentBiddingAmount += 2.5;
          break;
        case (this.currentBiddingAmount < 100) : 
          this.currentBiddingAmount += 5;
          break;
        default : 
          this.currentBiddingAmount += 10;
      }
    }
    else{
      this.firstBid = false;
    }
  }

  removePlayer(){
    if(!this.viewAllFlag){      
      if (this.player && (this.currentBiddingAmount != this.player.BasePrice)){
        switch (true){
          case (this.currentBiddingAmount < 30) : 
            this.currentBiddingAmount -= 2;
            break;
          case (this.currentBiddingAmount < 40) : 
            this.currentBiddingAmount -= 2.5;
            break;
          case (this.currentBiddingAmount < 100) : 
            this.currentBiddingAmount -= 5;
            break;
          default : 
            this.currentBiddingAmount -= 10;
        }
        if((this.currentBiddingAmount == this.player.BasePrice) && !this.undo.TeamID){        
          this.undo.isActive = false;
        }
      }
      
      else if(this.undo && this.undo.TeamID && (this.currentBidderClr == "")){
        this.fplService.removePlayerfromTeam(this.undo.TeamID, this.undo.PlayerID).subscribe(() => {
          this.fplService.updateRemovedPlayerfromTeam(this.undo.TeamID, this.undo.PlayerID);
          this.player = null;
          this.currentBidderId = null;
          this.currentBiddingAmount = null;
          this.firstBid = false;
          this.undo.PlayerID = null;
          this.undo.TeamID = null;
          this.undo.isActive = false;
        }
        );
      }
      this.currentBidderClr = "";
    }
    this.viewAllFlag = false;
  }

  viewAllAuctionablePlayers(){
    this.fplService.getAllAuctionablePlayers().subscribe((auctionablePlayers: IPlayerInfo[]) => {
      this.auctionablePlayers = auctionablePlayers;
      this.viewAllFlag = true;    
    }) 
  }

  selectedPlayer(selectedId: number){
    var selectedPlayer = this.auctionablePlayers.find(player => player.PlayerID == selectedId);
    this.player = selectedPlayer;
    this.currentBidderClr = "";
    this.currentBidderId = null;
    this.currentBiddingAmount = this.player.BasePrice;
    this.firstBid = true;
    this.undo.PlayerID = null;
    this.undo.TeamID = null;
    this.undo.isActive = false;

    if (!this.allTeamList){
      this.allTeamList = this.fplService.getUpdatedTeamList();
      this.shortTeamsName = [];
      this.allTeamList.forEach(team => {
        var name = team.TeamName.split(' ');
        var abbrivation="";
        for (var i = 0; i < name.length; i++){
          abbrivation = abbrivation + name[i].substr(0,1);
        }            
        this.shortTeamsName.push(abbrivation);
      });
    }

    this.viewAllFlag = false;
  }
}
