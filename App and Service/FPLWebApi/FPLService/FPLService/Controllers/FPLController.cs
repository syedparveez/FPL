using DataAccessLibrary;
using FPLService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FPLService.Controllers
{
    //[Authorize]
    public class FPLController : ApiController
    {
        // GET api/values
        [Route("api/getAllAuctionablePlayers")]
        public IEnumerable<PlayerInfo> Get()
        {
            using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
            {
                var data = FplDbEntities.GetAllAuctionablePlayersDetails().ToList();
                List<PlayerInfo> allPlayers = new List<PlayerInfo>();
                foreach ( var player in data)
                {
                    PlayerInfo playerData = new PlayerInfo();
                    playerData.AuctionID = player.AuctionID;
                    playerData.PlayerID = player.PlayerID;
                    playerData.PlayerName = player.PlayerName;
                    playerData.BattingStyle = player.BattingStyle;
                    playerData.BowlingStyle = player.BowlingStyle;
                    playerData.BasePrice = player.BasePrice;
                    playerData.AuctionedPrice = player.AuctionedPrice ?? default(int);
                    allPlayers.Add(playerData);
                }
                return allPlayers;
            }
        }

        // GET api/values/5
        [Route("api/getAuctionablePlayerById/{id}")]
        public PlayerInfo Get(int id)
        {
            using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
            {
                var data = FplDbEntities.getAuctionablePlayerById(id).ToList();
                PlayerInfo player = new PlayerInfo();
                player.AuctionID = data[0].AuctionID;
                player.PlayerID = data[0].PlayerID;
                player.PlayerName = data[0].PlayerName;
                player.BattingStyle = data[0].BattingStyle;
                player.BowlingStyle = data[0].BowlingStyle;
                player.BasePrice = data[0].BasePrice;
                player.AuctionedPrice = data[0].AuctionedPrice ?? default(int);
                return player;
            }
        }

        [Route("api/getAllTeamDetails")]
        public IEnumerable<TeamDetails> GetAllTeam()
        {
            using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
            {
                var data = FplDbEntities.getAllTeamDetails().ToList();
                var groupedTeams = data.GroupBy(m => m.TeamID).Select(m => new { TeamID = m.Key, PlayersInTeam = m.ToList(), TeamName = m.FirstOrDefault().TeamName, OwnerName = m.FirstOrDefault().OwnerName, CaptainID = m.FirstOrDefault().CaptainID, CaptainName = m.FirstOrDefault().CaptainName});
                List<TeamDetails> allTeams = new List<TeamDetails>();
                foreach (var team in groupedTeams)
                {
                    TeamDetails teamData = new TeamDetails();
                    teamData.PlayersInTeam = new List<PlayerInfo>();
                    teamData.TeamID = team.TeamID;
                    teamData.TeamName = team.TeamName;
                    teamData.OwnerName = team.OwnerName;
                    teamData.CaptainID = team.CaptainID;
                    teamData.CaptainName = team.CaptainName;
                    
                    foreach (var player in team.PlayersInTeam)
                    {
                        PlayerInfo playerDetails = new PlayerInfo();
                        playerDetails.PlayerID = player.PlayerID;
                        playerDetails.PlayerName = player.PlayerName;
                        teamData.PlayersInTeam.Add(playerDetails);
                    }
                    allTeams.Add(teamData);
                }
                return allTeams;
            }
        }
        [Route("api/getTeamDetailsById/{id}")]
        public List<TeamDetails> GetTeam(int id)
        {
            using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
            {
                var data = FplDbEntities.getTeamDetailsByTeamID(id).ToList();
                var groupedTeam = data.GroupBy(m => m.TeamID).Select(m => new { TeamID = m.Key, PlayersInTeam = m.ToList(), TeamName = m.FirstOrDefault().TeamName, OwnerName = m.FirstOrDefault().OwnerName, CaptainID = m.FirstOrDefault().CaptainID, CaptainName = m.FirstOrDefault().CaptainName });
                List<TeamDetails> allTeams = new List<TeamDetails>();
                foreach (var team in groupedTeam)
                {
                    TeamDetails teamData = new TeamDetails();
                    teamData.PlayersInTeam = new List<PlayerInfo>();
                    teamData.TeamID = team.TeamID;
                    teamData.TeamName = team.TeamName;
                    teamData.OwnerName = team.OwnerName;
                    teamData.CaptainID = team.CaptainID;
                    teamData.CaptainName = team.CaptainName;

                    foreach (var player in team.PlayersInTeam)
                    {
                        PlayerInfo playerDetails = new PlayerInfo();
                        playerDetails.PlayerID = player.PlayerID;
                        playerDetails.PlayerName = player.PlayerName;
                        playerDetails.BattingStyle = player.BattingStyle;
                        playerDetails.BowlingStyle = player.BowlingStyle;
                        playerDetails.Bio = player.Bio;
                        playerDetails.AuctionedPrice = player.AuctionedPrice ?? default(int);
                        teamData.PlayersInTeam.Add(playerDetails);
                    }
                    allTeams.Add(teamData);
                }
                return allTeams;
            }
            
        }

        // POST api/values
        [HttpPost]
        [Route("api/addPlayer")]
        public HttpResponseMessage Post([FromBody] AddPlayerViewModel model)
        {
            try
            {
                using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
                {
                    FplDbEntities.addPlayerToTeam(model.TeamID, model.PlayerID, model.Year, model.AuctionedPrice);

                    var msg = Request.CreateResponse(HttpStatusCode.OK, model);
                    msg.Headers.Location = new Uri(Request.RequestUri + model.ToString());

                    return msg;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpGet]
        [Route("api/getTeamList")]
        public IEnumerable<getAllTeamList_Result> getTeamList()
        {
            using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
            {
                return FplDbEntities.getAllTeamList().ToList();
            }
        }
        [HttpPost]
        [Route("api/removePlayer")]
        // DELETE api/values/5
        public HttpResponseMessage RemovePlayer([FromBody] AddPlayerViewModel model)
        {
            try
            {
                using (FintellixPremierLeagueEntities FplDbEntities = new FintellixPremierLeagueEntities())
                {
                    FplDbEntities.removePlayer(model.TeamID, model.PlayerID, model.Year);

                    var msg = Request.CreateResponse(HttpStatusCode.OK, model);
                    msg.Headers.Location = new Uri(Request.RequestUri + model.ToString());

                    return msg;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
