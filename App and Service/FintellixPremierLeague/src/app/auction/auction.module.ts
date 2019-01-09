import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { AuctionBoardComponent } from './auction-board/auction-board.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsPanelComponent } from './auction-board/teams-panel/teams-panel.component';
import { AuctionPanelComponent } from './auction-board/auction-panel/auction-panel.component';
import { AppRoutingModule } from '../app-routing.module';
import { FplService } from '../shared/fpl-service';


@NgModule({
  declarations: [
    AuctionBoardComponent,
    TeamDetailsComponent,
    TeamsPanelComponent,
    AuctionPanelComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [FplService
  ]
})
export class AuctionModule { }
