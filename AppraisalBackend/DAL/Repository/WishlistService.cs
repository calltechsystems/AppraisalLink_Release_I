using DAL.Classes;
using DBL.Models;

namespace DAL.Repository;

public class WishlistService : IWishlistService
{
    private readonly AppraisalLandsContext _AppraisallandContext;

    public WishlistService(AppraisalLandsContext AppraisallandContext)
    {
        _AppraisallandContext = AppraisallandContext;
    }

    public Task<Wishlist> AddToWishlist(ClsWishlist wishlist)
    {
        var wishlist1 = new Wishlist();
        wishlist1.PropertyId = wishlist.PropertyId;
        wishlist1.UserId = wishlist.UserId;
        wishlist1.AddedDateTime = DateTime.Now;
        _AppraisallandContext.Add(wishlist1);
        _AppraisallandContext.SaveChanges();

        return Task.FromResult(wishlist1);
    }

    public Task<List<Wishlist>> GetWishlistsAsync()
    {
        var Allwishlists = _AppraisallandContext.Wishlists.ToList();
        if (Allwishlists != null) return Task.FromResult(Allwishlists);
        return null;
    }

    public Task<bool> RemoveFromWishlist(long wishlistId)
    {
        var wishlist = _AppraisallandContext.Wishlists.Where(x => x.Id == wishlistId).FirstOrDefault();
        if (wishlist != null)
        {
            _AppraisallandContext.Wishlists.Remove(wishlist);
            _AppraisallandContext.SaveChanges();
            return Task.FromResult(true);
        }

        return null;
    }
}