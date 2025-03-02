using DAL.Classes;
using DBL.Models;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class AppraiserCompanyService : IAppraiserCompany
    {
        private readonly AppraisallandsContext _appraisallandContext;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public AppraiserCompanyService(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="assignProperty"></param>
        /// <returns></returns>
        public async Task<bool> AssignProperty(ClsAssignProperty assignProperty)
        {
            try
            {
                var propertyDetail = _appraisallandContext.AssignProperties.Where(x => x.CompanyId == assignProperty.CompanyId && x.PropertyId == assignProperty.PropertyId).FirstOrDefault();
                if (assignProperty.CompanyId > 0 && assignProperty.AppraiserId == 0)
                {
                    var assignPropertyDetail = _appraisallandContext.AssignProperties.Where(x => x.PropertyId == assignProperty.PropertyId && x.CompanyId == assignProperty.CompanyId).FirstOrDefault();
                    assignPropertyDetail.IsSelfAssigned = false;

                    _appraisallandContext.AssignProperties.Update(assignPropertyDetail);
                    _appraisallandContext.SaveChanges();
                    return true;
                }
                if (propertyDetail == null)
                {
                    var appraiser = _appraisallandContext.Appraisers.Where(x => x.Id == assignProperty.AppraiserId).FirstOrDefault();

                    if (appraiser.CompanyId != null)
                    {
                        AssignProperty newAssignProperty = new AssignProperty();
                        newAssignProperty.PropertyId = assignProperty.PropertyId;
                        newAssignProperty.CompanyId = assignProperty.CompanyId;
                        newAssignProperty.AppraiserId = assignProperty.AppraiserId;
                        newAssignProperty.CreatedDateTime = DateTime.Now;
                        newAssignProperty.AssignCount = 1;
                        newAssignProperty.IsSelfAssigned = true;
                        _appraisallandContext.AssignProperties.Add(newAssignProperty);
                        _appraisallandContext.SaveChanges();
                        SendMailassignPropertyByCompany(appraiser.EmailId);

                        return true;
                    }
                }
                else
                {
                    //if (Assign_Details.AssignCount<2)
                    //{

                    var propertyDetails = _appraisallandContext.Properties.Where(x => x.PropertyId == assignProperty.PropertyId).FirstOrDefault();
                    //var Appraiser_Details = _AppraisallandContext.Appraisers.Where(x => x.Id == assignProperty.Appraiserid).FirstOrDefault();
                    var appraiserDetails = _appraisallandContext.AppraiserCompanies.Where(x => x.AppraiserCompanyId == assignProperty.CompanyId).FirstOrDefault();
                    if (appraiserDetails != null && propertyDetails != null)
                    {
                        var bidDetails = _appraisallandContext.Bids
                                         .Where(x => x.OrderId == propertyDetails.OrderId && x.AppraiserUserId == appraiserDetails.UserId)
                                         .OrderByDescending(x => x.RequestTime)
                                         .FirstOrDefault();
                        bidDetails.OrderStatus = 0;
                        _appraisallandContext.Bids.Update(bidDetails);
                        _appraisallandContext.SaveChanges();
                    }
                    propertyDetail.AppraiserId = assignProperty.AppraiserId;
                    propertyDetail.AssignCount = 2;
                    propertyDetail.IsSelfAssigned = true;
                    _appraisallandContext.AssignProperties.Update(propertyDetail);
                    _appraisallandContext.SaveChanges();
                    return true;
                    //}
                    //else
                    //{
                    //    return false;
                    //}
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error AppraiserCompanyService->AssignProperty Method: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
                    EnableSsl = true
                };

                smtp.Send(appraiserMail);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error AppraiserCompanyService->SendMailassignPropertyByCompany Method: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public async Task<List<AssignProperty>>? GetAllassignProperty(long companyId)
        {
            var assignProperties = _appraisallandContext.AssignProperties.Where(x => x.CompanyId == companyId).ToList();
            if (assignProperties != null)
            {
                return assignProperties;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public AppraiserCompany? GetAppraiserCompany(long userId)
        {
            var appraiserCompany = _appraisallandContext.AppraiserCompanies.Where(x => x.UserId == userId).FirstOrDefault();
            if (appraiserCompany != null)
            {
                return appraiserCompany;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public AppraiserCompany? GetAppraisersCompany(long userId)
        {
            var appraiserCompany = _appraisallandContext.AppraiserCompanies.Where(x => x.UserId == userId).FirstOrDefault();
            if (appraiserCompany != null)
            {
                return appraiserCompany;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="appraiserCompany"></param>
        /// <returns></returns>
        public async Task<AppraiserCompany>? UpdateAppraiserCompanyAsync(int userId, ClsAppraiserCompany appraiserCompany)
        {
            var appraiserCompanyUser = _appraisallandContext.AppraiserCompanies.Where(x => x.UserId == userId).FirstOrDefault();
            var userDetails = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();
            if (appraiserCompanyUser != null)
            {
                appraiserCompanyUser.LicenseNumber = appraiserCompany.LicenseNumber;
                appraiserCompanyUser.AppraiserCompanyName = appraiserCompany.AppraiserCompanyName;
                appraiserCompanyUser.AddressLineOne = appraiserCompany.AddressLineOne;
                appraiserCompanyUser.AddressLineTwo = appraiserCompany.AddressLineTwo;
                appraiserCompanyUser.City = appraiserCompany.City;
                appraiserCompanyUser.State = appraiserCompany.State;
                appraiserCompanyUser.PostalCode = appraiserCompany.PostalCode;
                appraiserCompanyUser.PhoneNumber = appraiserCompany.PhoneNumber;
                appraiserCompanyUser.FirstName = appraiserCompany.FirstName;
                appraiserCompanyUser.LastName = appraiserCompany.LastName;
                appraiserCompanyUser.OfficeContactFirstName = appraiserCompany.OfficeContactFirstName;
                appraiserCompanyUser.OfficeContactLastName = appraiserCompany.OfficeContactLastName;
                appraiserCompanyUser.OfficeContactEmail = appraiserCompany.OfficeContactEmail;
                appraiserCompanyUser.OfficeContactPhone = appraiserCompany.OfficeContactPhone;
                appraiserCompanyUser.LenderListUrl = appraiserCompany.LenderListUrl;
                appraiserCompanyUser.CellNumber = appraiserCompany.CellNumber;
                appraiserCompanyUser.EmailId = appraiserCompany.EmailId;
                appraiserCompanyUser.StreetNumber = appraiserCompany.StreetNumber;
                appraiserCompanyUser.StreetName = appraiserCompany.StreetName;
                appraiserCompanyUser.ApartmentNumber = appraiserCompany.ApartmentNumber;
                appraiserCompanyUser.ProfileImage = appraiserCompany.ProfileImage;
                appraiserCompanyUser.ModifiedDateTime = DateTime.UtcNow;
                _appraisallandContext.AppraiserCompanies.Update(appraiserCompanyUser);
                _appraisallandContext.SaveChanges();
                //User_Details.GetSms = AppraiserCompany.GetSms;
                //User_Details.GetEmail= AppraiserCompany.GetEmail;
                //_AppraisallandContext.UserInformations.Update(User_Details);
                //_AppraisallandContext.SaveChanges();
                return appraiserCompanyUser;
            }
            else
            {
                return null;
            }
        }
    }
}
