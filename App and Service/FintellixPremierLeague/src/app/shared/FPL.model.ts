export interface ITeamDetails{
    TeamID:number,
    TeamName:string,
    OwnerName:string,
    CaptainID:number,
    CaptainName:string,
    PlayersInTeam : IPlayerInfo[]
}

export interface IPlayerInfo{
PlayerID:number,
PlayerName:string,
AuctionID?:number,
BattingStyle:string,
BowlingStyle:string,
Bio?:string,
BasePrice:number,
AuctionedPrice:number
}

export interface ITeamList{
    TeamID: number,
    TeamName: string
}
export interface IUndo {
    TeamID: number,
    PlayerID: number,
    isActive: boolean
}