using DAL.Classes;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface Ibid
    {
        Task<DBL.Models.Bid> AppraiserBidAsync(ClsBid clsBid);
        Task<List<DBL.Models.Bid>> getAllAppraiserBidAsync(int OrderId);
        Task<List<DBL.Models.Bid>> getAllQuotesByAppraiser();
        Task<List<DBL.Models.Bid>> getAppraiserBidbyId(long PropertyID);
        Task<List<DBL.Models.Bid>> getAppraiserBidbyUserID(long Userid);
        Task<DBL.Models.Bid> AcceptBidAsync(int bidId);
        Task<DBL.Models.Bid> DeclineBidAsync(int bidId);
        Task<DBL.Models.Bid> UpdateBid(long bidiD, Classes.Bid bid);
         DBL.Models.Bid UpdateStatus(QuoteClass quoteClass);
     



    }
}
