using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class WishlistService : IWishlistService
    {
        readonly private AppraisallandsContext _appraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public WishlistService(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wishlist"></param>
        /// <returns></returns>
        public Task<Wishlist> AddToWishlist(ClsWishlist wishlist)
        {
            Wishlist newWishlist = new Wishlist();
            newWishlist.PropertyId = wishlist.PropertyId;
            newWishlist.UserId = wishlist.UserId;
            newWishlist.AddedDateTime = DateTime.Now;
            _appraisallandContext.Add(newWishlist);
            _appraisallandContext.SaveChanges();

            return Task.FromResult(newWishlist);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<Wishlist>> GetWishlistsAsync()
        {
            var allwishlists = _appraisallandContext.Wishlists.ToList();
            if (allwishlists != null)
            {
                return Task.FromResult(allwishlists);
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wishlistId"></param>
        /// <returns></returns>
        public Task<bool> RemoveFromWishlist(long wishlistId)
        {
            var wishlist = _appraisallandContext.Wishlists.Where(x => x.Id == wishlistId).FirstOrDefault();
            if (wishlist != null)
            {
                _appraisallandContext.Wishlists.Remove(wishlist);
                _appraisallandContext.SaveChanges();
                return Task.FromResult(true);
            }

            return null;
        }
    }
}