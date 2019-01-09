using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FPLService.Models
{
    public class AddPlayerViewModel
    {
        public int TeamID { get; set; }
        public int PlayerID { get; set; }
        public long Year { get; set; }
        public int AuctionedPrice { get; set; }
    }
}