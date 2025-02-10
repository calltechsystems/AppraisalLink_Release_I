using DAL.Classes;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IWishlistService
    {
        Task<List<Wishlist>> GetWishlistsAsync();
        Task<Wishlist> AddToWishlist(ClsWishlist wishlist);
        Task<bool> RemoveFromWishlist(long wishlistId);
    }
}
