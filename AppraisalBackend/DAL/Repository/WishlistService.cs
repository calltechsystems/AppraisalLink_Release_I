using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
     /// <summary>
     /// 
     /// </summary>
    public class WishlistService : IWishlistService
    {
        readonly private AppraisallandsContext _AppraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="AppraisallandContext"></param>
        public WishlistService(AppraisallandsContext AppraisallandContext)
        {
            _AppraisallandContext = AppraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wishlist"></param>
        /// <returns></returns>
        public Task<Wishlist> AddToWishlist(ClsWishlist wishlist)
        {
            Wishlist wishlist1 = new Wishlist();
            wishlist1.PropertyId = wishlist.PropertyId;
            wishlist1.UserId = wishlist.UserId;
            wishlist1.AddedDateTime = DateTime.Now;
            _AppraisallandContext.Add(wishlist1);
            _AppraisallandContext.SaveChanges();

            return Task.FromResult(wishlist1);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<Wishlist>> GetWishlistsAsync()
        {
            var Allwishlists = _AppraisallandContext.Wishlists.ToList();
            if (Allwishlists != null)
            {
                return Task.FromResult(Allwishlists);
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
}