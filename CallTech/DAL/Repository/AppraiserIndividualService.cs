using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class AppraiserIndividualService : IAppraiserIndividual
    {
        private readonly AppraisallandsContext _AppraisallandContext;
        public AppraiserIndividualService(AppraisallandsContext AppraisallandContext)
        {
            _AppraisallandContext = AppraisallandContext;
        }

        public Task<List<AppraiserCompany>> GetAllAppraiserCompany()
        {
            var AppraiserCompany = _AppraisallandContext.AppraiserCompanies.ToList();
            return Task.FromResult(AppraiserCompany);
        }

        public Task<List<Appraiser>> GetAllApps()
        {
            var Appraisers = _AppraisallandContext.Appraisers.ToList();
            return Task.FromResult(Appraisers);
        }

        public Task<List<Brokerage>> GetAllBrokerage()
        {
            var Brokerages = _AppraisallandContext.Brokerages.ToList();
            return Task.FromResult(Brokerages);
        }

        public async Task<List<List<Property>>> GetAllbrokerageProperies()
        {
            List<List<Property>> properties = new List<List<Property>>();
            var usertype = 2;
            var user_type = 6;
            var ListOfBroker = _AppraisallandContext.UserInformations.Where(x => x.UserType == usertype || x.UserType == user_type).Select(x => x.UserId).ToList();
            foreach (var b in ListOfBroker)
            {
                var property = _AppraisallandContext.Properties.Where(x => x.UserId == b).ToList();
                properties.Add(property);
            }
            return properties;
        }

        public async Task<List<List<Property>>> GetAllProperties()
        {
            List<List<Property>> properties = new List<List<Property>>();
            var usertype = 1;
            var ListOfBroker = _AppraisallandContext.UserInformations.Where(x => x.UserType == usertype).Select(x => x.UserId).ToList();
            foreach (var b in ListOfBroker)
            {
                var property = _AppraisallandContext.Properties.Where(x => x.UserId == b).ToList();
                properties.Add(property);
            }
            return properties;
        }

        public Task<Appraiser> GetAppraiser(long AppraiserId)
        {
            var Appraiser = _AppraisallandContext.Appraisers.Where(x => x.Id == AppraiserId).FirstOrDefault();
            if (Appraiser != null)
            {
                return Task.FromResult(Appraiser);
            }

            return null;
        }

        public List<Appraiser> getAppraiser(long appraiserid)
        {
            var appraisers = _AppraisallandContext.Appraisers.Where(x => x.CompanyId == appraiserid).ToList();
            if (appraisers.Count() != 0)
            {
                return appraisers;
            }
            return null;
        }

        public List<Appraiser> GetAppraiserByUserId(long UserId)
        {
            var Appraiser = _AppraisallandContext.Appraisers.Where(x => x.UserId == UserId).ToList();
            if (Appraiser != null)
            {
                return Appraiser;
            }

            return null;
        }

        public bool IsActive(long id, bool IsActive)
        {
            var Appraiser = _AppraisallandContext.Appraisers.Where(x => x.UserId == id).FirstOrDefault();
            if (Appraiser != null)
            {
                
               var appraisersAssign= _AppraisallandContext.AssignProperties.Where(x=>x.Appraiserid== Appraiser.Id).ToList();
                foreach (var appraiserAssign in appraisersAssign)
                {
                    _AppraisallandContext.AssignProperties.Remove(appraiserAssign);
                    _AppraisallandContext.SaveChanges();
                }
                Appraiser.IsActive = IsActive;
                Appraiser.ModifiedDateTime = DateTime.UtcNow;
                _AppraisallandContext.Appraisers.Update(Appraiser);
                _AppraisallandContext.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<Appraiser> UpdateAppraiserIndividualAsync(int UserId, ClsAppraiserIndividual AppraiserIndividual)
        {
            var AppraiserIndividualUser = _AppraisallandContext.Appraisers.Where(x => x.UserId == UserId).FirstOrDefault();
            var User_Details=_AppraisallandContext.UserInformations.Where(x=>x.UserId== UserId).FirstOrDefault();
            if (AppraiserIndividualUser != null)
            {
                AppraiserIndividualUser.FirstName = AppraiserIndividual.FirstName;
                AppraiserIndividualUser.MiddleName = AppraiserIndividual.MiddleName;
                AppraiserIndividualUser.LastName = AppraiserIndividual.LastName;
                AppraiserIndividualUser.CompanyName = AppraiserIndividual.CompanyName;
                AppraiserIndividualUser.StreetNumber = AppraiserIndividual.StreetNumber;
                AppraiserIndividualUser.StreetName = AppraiserIndividual.StreetName;
                AppraiserIndividualUser.ApartmentNo = AppraiserIndividual.ApartmentNo;
                AppraiserIndividualUser.City = AppraiserIndividual.City;
                AppraiserIndividualUser.Province = AppraiserIndividual.Province;
                AppraiserIndividualUser.PostalCode = AppraiserIndividual.PostalCode;
                AppraiserIndividualUser.Area = AppraiserIndividual.Area;
                AppraiserIndividualUser.PhoneNumber = AppraiserIndividual.PhoneNumber;
                AppraiserIndividualUser.CommissionRate = AppraiserIndividual.CommissionRate;
                AppraiserIndividualUser.MaxNumberOfAssignedOrders = AppraiserIndividual.MaxNumberOfAssignedOrders;
                AppraiserIndividualUser.Designation = AppraiserIndividual.Designation;
                AppraiserIndividualUser.ProfileImage = AppraiserIndividual.ProfileImage;
                AppraiserIndividualUser.LenderListUrl = AppraiserIndividual.LenderListUrl;
                AppraiserIndividualUser.CellNumber = AppraiserIndividual.CellNumber;
                AppraiserIndividualUser.EmailId = AppraiserIndividual.EmailId;
                AppraiserIndividualUser.ModifiedDateTime = DateTime.UtcNow;
                AppraiserIndividualUser.IsActive = true;
                _AppraisallandContext.Appraisers.Update(AppraiserIndividualUser);
                _AppraisallandContext.SaveChanges();
                //User_Details.GetEmail= AppraiserIndividual.GetEmail;
                //User_Details.GetSms= AppraiserIndividual.GetSms;
                //_AppraisallandContext.UserInformations.Update(User_Details);
                //_AppraisallandContext.SaveChanges(); 
                return AppraiserIndividualUser;
            }
            return null;
        }

        public async Task<Plan> UpdatePlan(int planid, int numberOfProperty, double amount)
        {
            var plan_Details = _AppraisallandContext.Plans.Where(x => x.Id == planid).FirstOrDefault();
            if (plan_Details != null)
            {
                if (numberOfProperty != 0 && amount != 0)
                {
                    plan_Details.NoOfProperties = numberOfProperty;
                    plan_Details.MonthlyAmount = amount;
                    plan_Details.MonthlyAmount= amount;
                    _AppraisallandContext.Plans.Update(plan_Details);
                    _AppraisallandContext.SaveChanges();
                    return plan_Details;
                }
                else if (numberOfProperty != 0)
                {
                    plan_Details.NoOfProperties = numberOfProperty;
                    _AppraisallandContext.Plans.Update(plan_Details);
                    _AppraisallandContext.SaveChanges();
                    return plan_Details;
                }
                else if (amount != 0)
                {
                    plan_Details.PlanValidity = amount;
                    _AppraisallandContext.Plans.Update(plan_Details);
                    _AppraisallandContext.SaveChanges();
                    return plan_Details;
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
