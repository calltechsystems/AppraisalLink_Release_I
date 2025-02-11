using DAL.Classes;
using Bid = DBL.Models.Bid;

namespace DAL.Repository
{
    public interface Ibid
    {
        Task<Bid> AppraiserBidAsync(DAL.Classes.Bid clsBid);
        Task<List<Bid>> getAllAppraiserBidAsync(int OrderId);
        Task<List<Bid>> getAllQuotesByAppraiser();
        Task<List<Bid>> getAppraiserBidbyId(long PropertyID);
        Task<List<Bid>> getAppraiserBidbyUserID(long Userid);
        Task<Bid> AcceptBidAsync(int bidId);
        Task<Bid> DeclineBidAsync(int bidId);
        Task<Bid> UpdateBid(long bidiD, Classes.Bid bid);
        Bid UpdateStatus(QuoteClass quoteClass);
    }
}