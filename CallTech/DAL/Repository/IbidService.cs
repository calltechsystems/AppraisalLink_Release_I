using DAL.Classes;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DAL.Rpository;
using Amazon.Runtime;
using Amazon.SimpleNotificationService.Model;
using Amazon.SimpleNotificationService;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class IbidService : Ibid
    {
        private readonly AppraisallandsContext _context;
        public IbidService(AppraisallandsContext context)
        {
            _context = context;
        }
        public async Task<DBL.Models.Bid> AppraiserBidAsync(ClsBid clsBid)
        {
            long? Appraiser_Id = clsBid.appraiserId;
            int? BidLowerRange = 0;
            int? BidUpperRange = 0;
            DateTime? request_time = DateTime.Now;

            int status = 0;
            var Quotes_Details=_context.Bids.Where(x=>x.OrderId==clsBid.OrderId).ToList();
            foreach (var item in Quotes_Details)
            {
                var t =item.Status;
                if (t == 1)
                {
                    status = 2;
                }
            }

            //var bid_data=_context.Appraisers.Where(x=>x.UserId==user_id).FirstOrDefault();
            var Property_data =  _context.Properties.Where(x => x.OrderId == clsBid.OrderId).FirstOrDefault();
            //var user = _context.UserInformations.Where(x => x.UserId == clsBid.appraiserId).FirstOrDefault();
            if (Property_data != null)
            {

                BidLowerRange = Property_data.BidLowerRange;
                BidUpperRange = Property_data.BidUpperRange;

            }
            else
            {
                return null;
            }
            var AppraiserName = "";
           var User_ID = Property_data.UserId;
            var UserDetails = _context.UserInformations.Where(x => x.UserId == User_ID).FirstOrDefault();
            if (UserDetails != null)
            {
                var UserEmail = UserDetails.Email;
                SendEmail(UserEmail, clsBid);
               // SendSms(clsBid);
            }
            var LenderListUrl = "";
            var AppraiserDetails = _context.Appraisers.Where(x => x.UserId == clsBid.appraiserId).FirstOrDefault();
            if (AppraiserDetails != null)
            {
                 AppraiserName = AppraiserDetails.FirstName + " " + AppraiserDetails.LastName;
                LenderListUrl=AppraiserDetails.LenderListUrl;
            }
            else
            {
                var appraiserCompanyDetails = _context.AppraiserCompanies.Where(x => x.UserId == clsBid.appraiserId).FirstOrDefault();
                AppraiserName= appraiserCompanyDetails.FirstName + appraiserCompanyDetails.LastName;
                LenderListUrl = appraiserCompanyDetails.LenderListUrl;
            }
            DBL.Models.Bid bid = new DBL.Models.Bid();
            bid.UserId = UserDetails.UserId;
            bid.Description = clsBid.Description;
            bid.Status = status;
            bid.AppraiserUserId = Appraiser_Id;
            bid.BidLowerRange = BidLowerRange;
            bid.BidUpperRange = BidUpperRange;
            bid.RequestTime = request_time;
            bid.OrderId = clsBid.OrderId;
            bid.BidAmount = clsBid.BidAmount;
            bid.AppraiserName= AppraiserName;
            bid.LenderListUrl =LenderListUrl;
            _context.Add(bid);
            _context.SaveChanges();

            return bid;
        }
        public async Task<PublishResponse> SendSms(ClsBid clsBid)
        {
            try
            {
                long? User_ID = 0;
                var property =_context.Properties.Where(x=>x.OrderId == clsBid.OrderId).FirstOrDefault(); 
                if (property != null)
                {
                     User_ID=property.UserId;
                }
                var user = _context.Brokers.Where(x => x.UserId == User_ID).FirstOrDefault();
                if (user != null)
                {
                    var Number = user.PhoneNumber;

                    string awsKeyId = "AKIA463TBXUOCZ3E2BYH";
                    string awsKeySecret = "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";

                    var awsCredentials = new BasicAWSCredentials(awsKeyId, awsKeySecret);
                    var snsClient = new AmazonSimpleNotificationServiceClient(awsCredentials, Amazon.RegionEndpoint.APSoutheast1);

                    var publishRequest = new PublishRequest
                    {
                        Message = "A new bid has been placed on your property",
                        PhoneNumber = Number
                    };

                    publishRequest.MessageAttributes.Add("AWS.SNS.SMS.SMSType", new MessageAttributeValue { StringValue = "Transactional", DataType = "String" });

                    PublishResponse publishResponse = await snsClient.PublishAsync(publishRequest);
                    return publishResponse;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return null;
        }
        public bool SendEmail(string toEmail, ClsBid clsBid)
        {
            try
            {
                var property=_context.Properties.Where(x=>x.OrderId==clsBid.OrderId).FirstOrDefault();
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "New Appraisal Quote Received: Action Required!";
                appraiserMail.To.Add(new MailAddress(toEmail));

                string appraiserMessage = $"Dear Broker's,\n\n";
                appraiserMessage += $"We're pleased to share that one of our esteemed appraisers has submitted a new quote for the property you listed.\n\n";
                appraiserMessage += $"Appraiser's Quote Details:\n";
                appraiserMessage += $"• Property: [{property.City},{property.StreetName},{property.StreetNumber},{property.ZipCode}]\n";
                appraiserMessage += $"• Appraised Value: [{clsBid.BidAmount}]\n";
                appraiserMessage += $"• Date of Appraisal: [{DateTime.Now}]\n\n";
                appraiserMessage += $"Your prompt attention to this quote is appreciated. Please login to our platform to review the details and proceed accordingly.\n\n";
                appraiserMessage += $"[Login](<a\"https://appraisal-eta.vercel.app/>) || [Appraisal Link](<a\"https://appraisal-eta.vercel.app/>)\n\n";
                appraiserMessage += $"Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land\n";


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

        public async Task<List<DBL.Models.Bid>> getAllAppraiserBidAsync(int OrderId)
        {
          var propertyDetails=_context.Properties.Where(x => x.OrderId==OrderId).FirstOrDefault();
            if (propertyDetails != null)
            {
                var bid_data =  _context.Bids.Where(x => x.OrderId == OrderId).OrderBy(x=>x.RequestTime).ToList();
                
                return bid_data;
            }
            return null;
        }

        public Task<List<DBL.Models.Bid>> getAppraiserBidbyId(long PropertyID)
        {
            var bid_data = _context.Bids.Where(x => x.OrderId == PropertyID).OrderByDescending(x => x.RequestTime).ToList();
            if (bid_data != null)
            {
                return Task.FromResult(bid_data);
            }
            return null;
        }

        public Task<DBL.Models.Bid> AcceptBidAsync(int bidId)
        {
            var data = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();
            if (data != null)
            {
                data.Status = 1;
                data.ResponseTime = DateTime.Now;
                _context.Bids.Update(data);
                _context.SaveChanges();
                SendMailAcceptQuotes(bidId);
                return Task.FromResult(data);
            }
            return null;
        }

        public bool SendMailAcceptQuotes( int bidId)
        {
            try
            {
                var Bid_Details = _context.Bids.Where(x=>x.BidId==bidId).FirstOrDefault();

                if (Bid_Details != null)
                {
                    var email=_context.UserInformations.Where(x=>x.UserId==Bid_Details.UserId).Select(x=>x.Email).FirstOrDefault();    
               
               
                    string pswd = "odkzjyvtiwmtdjtq";
                    MailMessage appraiserMail = new MailMessage();
                    appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                    appraiserMail.Subject = "Exciting Update: Your Property Quote Approved!";
                    appraiserMail.To.Add(new MailAddress(email));

                    string appraiserMessage = $"Subject: Exciting Update: Your Property Quote Approved!\n\n";
                    appraiserMessage += $"Dear Appraiser's,\n\n";
                    appraiserMessage += $"Your quote for the property has been approved by the broker. To proceed with the next steps, please visit our website to contact the broker.\n";
                    appraiserMessage += $"Login || Appraisal Link (<a href='http://appraisal-eta.vercel.app'>)\n\n";
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


                }


                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public bool SendMailDeclineQuotes(int bidId)
        {
            try
            {
                var Bid_Details = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();

                if (Bid_Details != null)
                {
                    var email = _context.UserInformations.Where(x => x.UserId == Bid_Details.UserId).Select(x => x.Email).FirstOrDefault();


                    string pswd = "odkzjyvtiwmtdjtq";
                    MailMessage appraiserMail = new MailMessage();
                    appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                    appraiserMail.Subject = "Property Appraisal Quote Rejected";
                    appraiserMail.To.Add(new MailAddress(email));

                    string appraiserMessage = $"Dear Appraiser's,\n\n";
                    appraiserMessage += $"We regret to inform you that the broker has rejected your quote for the property (order ID:{Bid_Details.OrderId}). Thank you for your time and effort.\n\n";
                    appraiserMessage += "Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                    appraiserMessage += "Best regards,\n";
                    appraiserMessage += "Support Team\n";
                    appraiserMessage += "Appraisal Land";

                    appraiserMail.Body = appraiserMessage;

                    NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = info,
                        EnableSsl = true
                    };

                    smtp.Send(appraiserMail);


                }


                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }
        public Task<DBL.Models.Bid> DeclineBidAsync(int bidId)
        {
            var data = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();
            if (data != null)
            {
                data.Status = 2;
                data.ResponseTime = DateTime.Now;
                _context.Bids.Update(data);
                _context.SaveChanges();
                SendMailDeclineQuotes(bidId);
                return Task.FromResult(data);
            }
            return null;
        }

        public async Task<DBL.Models.Bid> UpdateBid(long bidiD, Classes.Bid bid)
        {
            try
            {
                var BidDetails = _context.Bids.Where(x => x.BidId == bidiD).FirstOrDefault();
                if (BidDetails != null)
                {
                    BidDetails.OrderId = bid.OrderId;
                    BidDetails.UserId = bid.UserId;
                    BidDetails.AppraiserUserId = bid.AppraiserUserId;
                    BidDetails.RequestTime = DateTime.Now;
                    BidDetails.Status = bid.Status;
                    BidDetails.Description = bid.Description;
                    BidDetails.BidAmount = bid.BidAmount;
                    BidDetails.BidLowerRange = bid.BidLowerRange;
                    BidDetails.BidUpperRange = bid.BidUpperRange;

                    _context.Bids.Update(BidDetails);
                    _context.SaveChanges();

                    return BidDetails;
                }
            }
            catch (Exception ex)
            {
                var _ex = ex;
                return null;

            }

            return null;
        }

        public Task<List<DBL.Models.Bid>> getAppraiserBidbyUserID(long Userid)
        {
            var bid_data = _context.Bids.Where(x => x.UserId == Userid).ToList();
            if (bid_data != null)
            {
                return Task.FromResult(bid_data);
            }
            return null;
        }

        public DBL.Models.Bid UpdateStatus(QuoteClass quoteClass)
        {
            try
            {
                var Bid_Details = _context.Bids.Where(x => x.BidId == quoteClass.Quoteid).FirstOrDefault();
                if (Bid_Details != null)
                {
                    Bid_Details.Orderstatus = quoteClass.OrderStatus;
                    Bid_Details.Remark = quoteClass.remark;
                    Bid_Details.ModifiedDate= DateTime.Now;
                    Bid_Details.Statusdate= quoteClass.statusDate;
                    _context.Bids.Update(Bid_Details);
                    _context.SaveChanges();
                    return Bid_Details;
                }
            }
            catch (Exception ex)
            {
                var _ex = ex;
            }
          
            return null;
        }

        public Task<List<DBL.Models.Bid>> getAllQuotesByAppraiser()
        {
           var bidDetails= _context.Bids.ToList();
            if (bidDetails!=null)
            {
                return Task.FromResult(bidDetails); 
            }
            else
            {
                return null;
            }
        }
    }
}
