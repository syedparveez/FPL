import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ITeamDetails, IPlayerInfo, ITeamList } from './FPL.model';
@Injectable()

export class FplService{
    constructor (private http: HttpClient) {

    }

    getTeamList(): Observable<ITeamList[]>{
        return this.http.get<ITeamList[]>('/api/getTeamList')
            .pipe(catchError(this.handleError<ITeamList[]>('getTeamList')))
    }

    updateTeamList(teamList: ITeamList[]){
        TeamList = teamList;
    }

    getUpdatedTeamList(){
        return TeamList;
    }


    getAllTeamDetails(): Observable<ITeamDetails[]> {
        return this.http.get<ITeamDetails[]>('/api/getAllTeamDetails')
            .pipe(catchError(this.handleError<ITeamDetails[]>('getAllTeamDetails')))
    }


    getTeamDetailsByID(id:number): Observable<ITeamDetails> {
        return this.http.get<ITeamDetails>('/api/getTeamDetailsById/' + id)
            .pipe(catchError(this.handleError<ITeamDetails>('getTeamDetailsByID')))
    }


    getPlayerForAuctionById(id:number){
        return this.http.get<IPlayerInfo>('/api/getAuctionablePlayerById/' + id)
            .pipe(catchError(this.handleError<IPlayerInfo>('getPlayerForAuctionById')));
    }

    getAllAuctionablePlayers(){
        return this.http.get<IPlayerInfo[]>('/api/getAllAuctionablePlayers')
            .pipe(catchError(this.handleError<IPlayerInfo[]>('getPlayerForAuctionById')));
    }


    addPlayerToTeam(teamId:number, playerId:number, auctionedPrice:number){
        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        };
        var body = {
            TeamID: teamId,
            PlayerID : playerId,
            Year: 2018,
            AuctionedPrice : auctionedPrice
        }
        return this.http.post<any>('/api/addPlayer', body ,options)
            .pipe(catchError(this.handleError<any>('addPlayerToTeam')));
    }


    removePlayerfromTeam(teamID:number, playerId: number){
       
        var body = ({
            TeamID: teamID,
            PlayerID : playerId,
            Year: 2018
        });

        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        };
        return this.http.post<any>('/api/removePlayer', body, options)
            .pipe(catchError(this.handleError<any>('removePlayerfromTeam')));
    }

    
    updateRemovedPlayerfromTeam(teamID:number, playerId: number){
        var playerToBeRemoved = AllTeamDetails.find(team => team.TeamID === teamID).PlayersInTeam.find(player => player.AuctionID === playerId);
       AllTeamDetails.find(team => team.TeamID === teamID).PlayersInTeam
       .splice(AllTeamDetails.find(team => team.TeamID === teamID).PlayersInTeam.indexOf(playerToBeRemoved), 1);
       
    }


    UpdateGlobalAllTeam(allTeam: ITeamDetails[]){
        AllTeamDetails = allTeam;
    }

    getUpdatedGlobalAllteam(){
        return AllTeamDetails;
    }


    updateAllTeamDetails(teamId: number,playerDetails: IPlayerInfo){
        AllTeamDetails.find(team => team.TeamID === teamId).PlayersInTeam.push(playerDetails);
    }


    private handleError<t> (operation = 'operation', result?){
        return (error :any): Observable <t> => {
            console.log(error);
            return of(result);
        }
    }
}
let addedPlayer: IPlayerInfo;
let AllTeamDetails: ITeamDetails[] = [];
let TeamList: ITeamList[];