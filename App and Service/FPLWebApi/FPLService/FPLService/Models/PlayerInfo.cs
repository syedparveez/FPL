using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FPLService.Models
{
    public class PlayerInfo
    {
        public int PlayerID { get; set; }
        public string PlayerName { get; set; }
        public long AuctionID { get; set; }
        public string BattingStyle { get; set; }
        public string BowlingStyle { get; set; }
        public string Bio { get; set; }
        public int BasePrice { get; set; }
        public int AuctionedPrice { get; set; }
    }
}