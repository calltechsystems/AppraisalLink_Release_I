using DAL.Classes;
using DBL.Models;

namespace DAL.Repository;

public interface IWishlistService
{
    Task<List<Wishlist>> GetWishlistsAsync();
    Task<Wishlist> AddToWishlist(ClsWishlist wishlist);
    Task<bool> RemoveFromWishlist(long wishlistId);
}