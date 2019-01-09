import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionBoardComponent } from './auction/auction-board/auction-board.component';
import { TeamDetailsComponent } from './auction/team-details/team-details.component';

export const fplRoutes: Routes = [
  {path:'auction', component:AuctionBoardComponent},
  {path:'team/:id',component:TeamDetailsComponent},
  {path:'', redirectTo:'/auction', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(fplRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
