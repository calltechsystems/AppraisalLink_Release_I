using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        readonly private AppraisallandsContext _context;
        readonly private IWishlistService _wishlistService;
        Log log = new Log();
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="wishlistService"></param>
        /// <param name="context"></param>
        public WishlistController(IWishlistService wishlistService, AppraisallandsContext context)
        {
            _wishlistService = wishlistService;
            _context = context;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getWishlists")]
        public ActionResult<IEnumerable<Wishlist>> getWishlists()
        {
            log.WriteLog("GetWishlists Function started");
            try
            {
                var Wishlists = _wishlistService.GetWishlistsAsync();
                return Ok(Wishlists.Result);
            }
            catch (Exception ex)
            {

                log.WriteLog("GetWishlists function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wishlistItem"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("AddToWishlist")]
        public ActionResult<Wishlist> AddToWishlist([FromBody] ClsWishlist wishlistItem)
        {
            log.WriteLog("AddToWishlist Function started");
            try
            {
                var propertyId = wishlistItem.PropertyId;
                var UserId = wishlistItem.UserId;
                var IsValid = _context.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
                var PropertyValid = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();

                var userid = wishlistItem.UserId;
                var PropertyId = wishlistItem.PropertyId;

                var isOnWishlist = _context.Wishlists.Where(x => x.UserId == userid && x.PropertyId == propertyId).FirstOrDefault();
                if (isOnWishlist == null)
                {
                    if (IsValid != null && PropertyValid != null)
                    {
                        var Wishlist = _wishlistService.AddToWishlist(wishlistItem);
                        return Ok(new { Message = "Item successfully added to the wishlist", Wishlist = Wishlist.Result });

                    }
                    return BadRequest("PropertyId is not valid OR UserId is not valid");
                }
                var response = new
                {
                    status = "success",
                    message = "The property is already on your wishlist."
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                log.WriteLog("AddToWishlist function" + ex.Message);
                return BadRequest(new { Message = "Failed to add item to the wishlist" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete("RemoveFromWishlist")]
        public async Task<IActionResult> RemoveFromWishlist(long id)
        {
            log.WriteLog("RemoveFromWishlist Function started");
            try
            {
                bool isRemoved = await _wishlistService.RemoveFromWishlist(id);
                if (isRemoved)
                {
                    return Ok(new { Message = "Item successfully removed from the wishlist" });
                }
                else
                {
                    return NotFound(new { Message = "Item not found in the wishlist or failed to remove" });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("AddToWishlist function" + ex.Message);
                return BadRequest(new { Message = "Failed to remove item to the wishlist" });
            }
        }
    }
}