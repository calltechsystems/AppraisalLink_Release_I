using DAL.Classes;
using Bid = DBL.Models.Bid;

namespace DAL.Repository
{
    public interface Ibid
    {
        Task<Bid> AppraiserBidAsync(DAL.Classes.Bid bidClass);
        Task<List<Bid>> getAllAppraiserBidAsync(int orderId);
        Task<List<Bid>> getAllQuotesByAppraiser();
        Task<List<Bid>> getAppraiserBidbyId(long propertyId);
        Task<List<Bid>> getAppraiserBidbyUserID(long userId);
        Task<Bid> AcceptBidAsync(int bidId);
        Task<Bid> DeclineBidAsync(int bidId);
        Task<Bid> UpdateBid(long bidId, Classes.Bid bidClass);
        Bid UpdateStatus(QuoteClass quoteClass);
    }
}