using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FPLService.Models
{
    public class TeamDetails
    {
        public int TeamID { get; set; }
        public string TeamName { get; set; }
        public string OwnerName { get; set; }
        public int CaptainID { get; set; }
        public string CaptainName { get; set; }
        public List<PlayerInfo> PlayersInTeam { get; set; }

    }
}