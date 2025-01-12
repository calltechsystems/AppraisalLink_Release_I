using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class AppraiserCompanyService : IAppraiserCompany
    {
        private readonly AppraisallandsContext _AppraisallandContext;
        public AppraiserCompanyService(AppraisallandsContext AppraisallandContext)
        {
            _AppraisallandContext= AppraisallandContext;
        }

        public async Task<bool> AssignProperty(ClsAssignProperty assignProperty)
        {
            try
            {
                var Assign_Details = _AppraisallandContext.AssignProperties.Where(x => x.Companyid == assignProperty.Companyid && x.Propertyid == assignProperty.Propertyid).FirstOrDefault();
                if (Assign_Details == null)
                {


                    var appraiser = _AppraisallandContext.Appraisers.Where(x => x.Id == assignProperty.Appraiserid).FirstOrDefault();

                    if (appraiser.CompanyId != null)
                    {
                        AssignProperty ObjAssign = new AssignProperty();
                        ObjAssign.Propertyid = assignProperty.Propertyid;
                        ObjAssign.Companyid = assignProperty.Companyid;
                        ObjAssign.Appraiserid = assignProperty.Appraiserid;
                        ObjAssign.CreatedDateTime = DateTime.Now;
                        _AppraisallandContext.AssignProperties.Add(ObjAssign);
                        _AppraisallandContext.SaveChanges();
                        SendMailassignPropertyByCompany(appraiser.EmailId);

                        return true;
                    }
                }
                else
                {
                    var property_Details=_AppraisallandContext.Properties.Where(x=>x.PropertyId==assignProperty.Propertyid).FirstOrDefault();
                    var Appraiser_Details = _AppraisallandContext.Appraisers.Where(x => x.Id == assignProperty.Appraiserid).FirstOrDefault();
                    if (Appraiser_Details != null && property_Details!=null)
                    {
                        var bid_Details = _AppraisallandContext.Bids
                                         .Where(x => x.OrderId == property_Details.OrderId && x.AppraiserUserId == Appraiser_Details.UserId)
                                         .OrderByDescending(x => x.RequestTime)
                                         .FirstOrDefault();
                        bid_Details.Orderstatus = 0;
                        _AppraisallandContext.Bids.Update(bid_Details);
                        _AppraisallandContext.SaveChanges();
                    }
                    Assign_Details.Appraiserid=assignProperty.Appraiserid;
                    _AppraisallandContext.AssignProperties.Update(Assign_Details);
                    _AppraisallandContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
            

        }

        public bool SendMailassignPropertyByCompany(string email)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Property Assignment Notification";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear Appraiser,\n\n";
                appraiserMessage += $"We're pleased to inform you that a new property has been assigned to you for appraisal. Thank you for your attention to this assignment.\n\n";
                appraiserMessage += $"Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land";

                appraiserMail.Body = appraiserMessage;

                NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = info,
                    EnableSsl = true
                };

                smtp.Send(appraiserMail);
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public async Task<List<AssignProperty>> GetAllassignProperty(long companyid)
        {
           var AssignProperties= _AppraisallandContext.AssignProperties.Where(x=>x.Companyid==companyid).ToList();
            if(AssignProperties!=null)
            {
                return AssignProperties;
            }
            return null;
        }

        public AppraiserCompany GetAppraiserCompany(long UserId)
        {
           var appraiserCompany =  _AppraisallandContext.AppraiserCompanies.Where(x => x.UserId == UserId).FirstOrDefault();
            if (appraiserCompany != null)
            {
               return appraiserCompany;
            }
            return null;
        }

        public AppraiserCompany GetAppraisersCompany(long UserId)
        {
            var appraiserCompany = _AppraisallandContext.AppraiserCompanies.Where(x => x.UserId == UserId).FirstOrDefault();
            if (appraiserCompany != null)
            {
                return appraiserCompany;
            }
            return null;
        }

        public async Task<AppraiserCompany> UpdateAppraiserCompanyAsync(int UserId, ClsAppraiserCompany AppraiserCompany)
        {
            var AppraiserCompanyUser = _AppraisallandContext.AppraiserCompanies.Where(x => x.UserId == UserId).FirstOrDefault();
            var User_Details = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
            if (AppraiserCompanyUser != null)
            {

                AppraiserCompanyUser.LicenseNumber = AppraiserCompany.LicenseNumber;
                AppraiserCompanyUser.AppraiserCompanyName = AppraiserCompany.AppraiserCompanyName;
                AppraiserCompanyUser.AddressLineOne = AppraiserCompany.AddressLineOne;
                AppraiserCompanyUser.AddressLineTwo = AppraiserCompany.AddressLineTwo;
                AppraiserCompanyUser.City = AppraiserCompany.City;
                AppraiserCompanyUser.State = AppraiserCompany.State;
                AppraiserCompanyUser.PostalCode = AppraiserCompany.PostalCode;
                AppraiserCompanyUser.PhoneNumber = AppraiserCompany.PhoneNumber;
                AppraiserCompanyUser.FirstName = AppraiserCompany.FirstName;
                AppraiserCompanyUser.LastName = AppraiserCompany.LastName;
                AppraiserCompanyUser.OfficeContactFirstName = AppraiserCompany.OfficeContactFirstName;
                AppraiserCompanyUser.OfficeContactLastName = AppraiserCompany.OfficeContactLastName;
                AppraiserCompanyUser.OfficeContactEmail = AppraiserCompany.OfficeContactEmail;
                AppraiserCompanyUser.OfficeContactPhone = AppraiserCompany.OfficeContactPhone;
                AppraiserCompanyUser.LenderListUrl = AppraiserCompany.LenderListUrl;
                AppraiserCompanyUser.CellNumber= AppraiserCompany.CellNumber;
                AppraiserCompanyUser.EmailId = AppraiserCompany.EmailId;
                AppraiserCompanyUser.StreetNumber = AppraiserCompany.StreetNumber;
                AppraiserCompanyUser.StreetName = AppraiserCompany.StreetName;
                AppraiserCompanyUser.ApartmentNumber = AppraiserCompany.ApartmentNumber;
                AppraiserCompanyUser.ProfileImage = AppraiserCompany.ProfileImage;
                AppraiserCompanyUser.ModifiedDateTime=DateTime.UtcNow;
                _AppraisallandContext.AppraiserCompanies.Update(AppraiserCompanyUser);
                _AppraisallandContext.SaveChanges();
                //User_Details.GetSms = AppraiserCompany.GetSms;
                //User_Details.GetEmail= AppraiserCompany.GetEmail;
                //_AppraisallandContext.UserInformations.Update(User_Details);
                //_AppraisallandContext.SaveChanges();
                return AppraiserCompanyUser;
            }
            return null;
        }
    }
}
