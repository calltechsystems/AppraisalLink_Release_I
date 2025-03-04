using AppraisalLand.Common.Enums;
using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class AppraiserIndividualService : IAppraiserIndividual
    {
        private readonly AppraisallandsContext _appraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public AppraiserIndividualService(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<AppraiserCompany>> GetAllAppraiserCompany()
        {
            var appraiserCompany = _appraisallandContext.AppraiserCompanies.ToList();
            return Task.FromResult(appraiserCompany);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<Appraiser>> GetAllApps()
        {
            var appraisers = _appraisallandContext.Appraisers.ToList();
            return Task.FromResult(appraisers);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<Brokerage>> GetAllBrokerage()
        {
            var brokerages = _appraisallandContext.Brokerages.ToList();
            return Task.FromResult(brokerages);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<List<Property>>> GetAllbrokerageProperies()
        {
            List<List<Property>> properties = new List<List<Property>>();
            var mortgageBrokerageUserType = (short)UserType.MortgageBrokerage;
            var subBrokerUserType = (short)UserType.SubBroker;
            var brokers = _appraisallandContext.UserInformations.Where(x => x.UserType == mortgageBrokerageUserType || x.UserType == subBrokerUserType).Select(x => x.UserId).ToList();
            foreach (var broker in brokers)
            {
                var property = _appraisallandContext.Properties.Where(x => x.UserId == broker).ToList();
                properties.Add(property);
            }
            return properties;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<List<Property>>> GetAllProperties()
        {
            List<List<Property>> properties = new List<List<Property>>();
            var brokerUserType = (short)UserType.MortgageBroker;
            var brokers = _appraisallandContext.UserInformations.Where(x => x.UserType == brokerUserType).Select(x => x.UserId).ToList();
            foreach (var broker in brokers)
            {
                var property = _appraisallandContext.Properties.Where(x => x.UserId == broker).ToList();
                properties.Add(property);
            }
            return properties;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        public Task<Appraiser> GetAppraiser(long appraiserId)
        {
            var appraiser = _appraisallandContext.Appraisers.Where(x => x.Id == appraiserId).FirstOrDefault();
            if (appraiser != null)
            {
                return Task.FromResult(appraiser);
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        public List<Appraiser> getAppraiser(long appraiserId)
        {
            var appraisers = _appraisallandContext.Appraisers.Where(x => x.CompanyId == appraiserId).ToList();
            if (appraisers.Count() != 0)
            {
                return appraisers;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Appraiser> GetAppraiserByUserId(long userId)
        {
            var appraiser = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).ToList();
            if (appraiser != null)
            {
                return appraiser;
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        public bool IsActive(long userId, bool isActive)
        {
            var appraiser = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
            if (appraiser != null)
            {
                var appraisersAssign = _appraisallandContext.AssignProperties.Where(x => x.AppraiserId == appraiser.Id).ToList();
                foreach (var appraiserAssign in appraisersAssign)
                {
                    _appraisallandContext.AssignProperties.Remove(appraiserAssign);
                    _appraisallandContext.SaveChanges();
                }
                appraiser.IsActive = isActive;
                appraiser.ModifiedDateTime = DateTime.UtcNow;
                _appraisallandContext.Appraisers.Update(appraiser);
                _appraisallandContext.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="appraiserIndividual"></param>
        /// <returns></returns>
        public async Task<Appraiser> UpdateAppraiserIndividualAsync(int userId, ClsAppraiserIndividual appraiserIndividual)
        {
            var appraiserIndividualUser = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
            var userDetails = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();
            if (appraiserIndividualUser != null)
            {
                appraiserIndividualUser.FirstName = appraiserIndividual.FirstName;
                appraiserIndividualUser.MiddleName = appraiserIndividual.MiddleName;
                appraiserIndividualUser.LastName = appraiserIndividual.LastName;
                appraiserIndividualUser.CompanyName = appraiserIndividual.CompanyName;
                appraiserIndividualUser.StreetNumber = appraiserIndividual.StreetNumber;
                appraiserIndividualUser.StreetName = appraiserIndividual.StreetName;
                appraiserIndividualUser.ApartmentNo = appraiserIndividual.ApartmentNo;
                appraiserIndividualUser.City = appraiserIndividual.City;
                appraiserIndividualUser.Province = appraiserIndividual.Province;
                appraiserIndividualUser.PostalCode = appraiserIndividual.PostalCode;
                appraiserIndividualUser.Area = appraiserIndividual.Area;
                appraiserIndividualUser.PhoneNumber = appraiserIndividual.PhoneNumber;
                appraiserIndividualUser.CommissionRate = appraiserIndividual.CommissionRate;
                appraiserIndividualUser.MaxNumberOfAssignedOrders = appraiserIndividual.MaxNumberOfAssignedOrders;
                appraiserIndividualUser.Designation = appraiserIndividual.Designation;
                appraiserIndividualUser.ProfileImage = appraiserIndividual.ProfileImage;
                appraiserIndividualUser.LenderListUrl = appraiserIndividual.LenderListUrl;
                appraiserIndividualUser.CellNumber = appraiserIndividual.CellNumber;
                appraiserIndividualUser.EmailId = appraiserIndividual.EmailId;
                appraiserIndividualUser.ModifiedDateTime = DateTime.UtcNow;
                appraiserIndividualUser.IsActive = true;
                _appraisallandContext.Appraisers.Update(appraiserIndividualUser);
                _appraisallandContext.SaveChanges();
                //User_Details.GetEmail= AppraiserIndividual.GetEmail;
                //User_Details.GetSms= AppraiserIndividual.GetSms;
                //_AppraisallandContext.UserInformations.Update(User_Details);
                //_AppraisallandContext.SaveChanges(); 
                return appraiserIndividualUser;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="numberOfProperty"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        public async Task<Plan> UpdatePlan(int planId, int numberOfProperty, double amount)
        {
            var planDetails = _appraisallandContext.Plans.Where(x => x.Id == planId).FirstOrDefault();
            if (planDetails != null)
            {
                if (numberOfProperty != 0 && amount != 0)
                {
                    planDetails.NoOfProperties = numberOfProperty;
                    planDetails.MonthlyAmount = amount;
                    _appraisallandContext.Plans.Update(planDetails);
                    _appraisallandContext.SaveChanges();
                    return planDetails;
                }
                else if (numberOfProperty != 0)
                {
                    planDetails.NoOfProperties = numberOfProperty;
                    _appraisallandContext.Plans.Update(planDetails);
                    _appraisallandContext.SaveChanges();
                    return planDetails;
                }
                else if (amount != 0)
                {
                    planDetails.PlanValidity = amount;
                    _appraisallandContext.Plans.Update(planDetails);
                    _appraisallandContext.SaveChanges();
                    return planDetails;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }

    }
}
