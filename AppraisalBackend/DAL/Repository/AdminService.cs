using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class AdminService : IAdmin
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public AdminService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<Property>> GetAllArchivedProperty()
        {
            List<Property> property = new List<Property>();
            var Properties = _context.AdminArchiveProperties.ToList();
            foreach (var item in Properties)
            {
                var orderId = item.OrderId;
                var Property_Details = _context.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();
                property.Add(Property_Details);
            }
            return Task.FromResult(property);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<UserInformation>> GetAllArchiveUser()
        {
            List<UserInformation> userInformation = new List<UserInformation>();
            var Users = _context.AdminArchiveUsers.ToList();
            foreach (var user in Users)
            {
                var userid = user.Userid;
                var user_Details = _context.UserInformations.Where(x => x.UserId == userid).FirstOrDefault();
                userInformation.Add(user_Details);
            }
            return Task.FromResult(userInformation);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public Task? PostArchiveProperty(int orderId)
        {
            var property_ = _context.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();
            if (property_ != null)
            {
                AdminArchiveProperty adminArchiveProperty = new AdminArchiveProperty();
                adminArchiveProperty.OrderId = orderId;
                _context.AdminArchiveProperties.Add(adminArchiveProperty);
                _context.SaveChanges();
                return Task.FromResult(adminArchiveProperty);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public Task? PostArchiveUser(int UserId)
        {
            var users = _context.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
            if (users != null)
            {
                AdminArchiveUser adminArchiveUser = new AdminArchiveUser();
                adminArchiveUser.Userid = UserId;
                _context.AdminArchiveUsers.Add(adminArchiveUser);
                _context.SaveChanges();
                return Task.FromResult(adminArchiveUser);
            }
            else
            {
                return null;
            }
        }
    }
}
