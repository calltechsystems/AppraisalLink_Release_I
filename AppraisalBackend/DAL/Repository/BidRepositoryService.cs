using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using DAL.Classes;
using DBL.Models;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class BidRepositoryService : Ibid
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public BidRepositoryService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bid"></param>
        /// <returns></returns>
        public async Task<DBL.Models.Bid> AppraiserBidAsync(DAL.Classes.Bid bid)
        {
            long? appraiserId = bid.AppraiserId;
            int? bidLowerRange = 0;
            int? bidUpperRange = 0;
            DateTime? requestTime = DateTime.Now;

            int status = 0;
            var quotesDetails = _context.Bids.Where(x => x.OrderId == bid.OrderId).ToList();
            foreach (var item in quotesDetails)
            {
                var t = item.Status;
                if (t == 1)
                {
                    status = 2;
                }
            }

            //var bid_data=_context.Appraisers.Where(x=>x.UserId==user_id).FirstOrDefault();
            var propertyDetail = _context.Properties.Where(x => x.OrderId == bid.OrderId).FirstOrDefault();
            //var user = _context.UserInformations.Where(x => x.UserId == clsBid.appraiserId).FirstOrDefault();
            if (propertyDetail != null)
            {
                bidLowerRange = propertyDetail.BidLowerRange;
                bidUpperRange = propertyDetail.BidUpperRange;
            }
            else
            {
                return null;
            }

            var appraiserName = "";
            var userId = propertyDetail.UserId;
            var userDetail = _context.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();
            if (userDetail != null)
            {
                var userEmail = userDetail.Email;
                SendEmail(userEmail, bid);
                // SendSms(clsBid);
            }
            var lenderListUrl = "";
            var appraiserDetail = _context.Appraisers.Where(x => x.UserId == bid.AppraiserUserId).FirstOrDefault();
            if (appraiserDetail != null)
            {
                appraiserName = appraiserDetail.FirstName + " " + appraiserDetail.LastName;
                lenderListUrl = appraiserDetail.LenderListUrl;
            }
            else
            {
                var appraiserCompanyDetail = _context.AppraiserCompanies.Where(x => x.UserId == bid.AppraiserUserId).FirstOrDefault();
                appraiserName = appraiserCompanyDetail.FirstName + appraiserCompanyDetail.LastName;
                lenderListUrl = appraiserCompanyDetail.LenderListUrl;
            }
            DBL.Models.Bid newBid = new DBL.Models.Bid();
            newBid.UserId = userDetail.UserId;
            newBid.Description = bid.Description;
            newBid.Status = status;
            newBid.AppraiserUserId = appraiserId;
            newBid.BidLowerRange = bidLowerRange;
            newBid.BidUpperRange = bidUpperRange;
            newBid.RequestTime = requestTime;
            newBid.OrderId = bid.OrderId;
            newBid.BidAmount = bid.BidAmount;
            newBid.AppraiserName = appraiserName;
            newBid.LenderListUrl = lenderListUrl;
            _context.Add(newBid);
            _context.SaveChanges();

            return newBid;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bid"></param>
        /// <returns></returns>
        public async Task<PublishResponse> SendSms(DBL.Models.Bid bid)
        {
            try
            {
                long? userId = 0;
                var propertyDetail = _context.Properties.Where(x => x.OrderId == bid.OrderId).FirstOrDefault();
                if (propertyDetail != null)
                {
                    userId = propertyDetail.UserId;
                }
                var userDetail = _context.Brokers.Where(x => x.UserId == userId).FirstOrDefault();
                if (userDetail != null)
                {
                    var phoneNumber = userDetail.PhoneNumber;

                    string awsKeyId = "AKIA463TBXUOCZ3E2BYH";
                    string awsKeySecret = "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";

                    var awsCredentials = new BasicAWSCredentials(awsKeyId, awsKeySecret);
                    var snsClient = new AmazonSimpleNotificationServiceClient(awsCredentials, Amazon.RegionEndpoint.APSoutheast1);

                    var publishRequest = new PublishRequest
                    {
                        Message = "A new bid has been placed on your property",
                        PhoneNumber = phoneNumber
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="toEmail"></param>
        /// <param name="bid"></param>
        /// <returns></returns>
        public bool SendEmail(string toEmail, DAL.Classes.Bid bid)
        {
            try
            {
                var property = _context.Properties.Where(x => x.OrderId == bid.OrderId).FirstOrDefault();
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "New Appraisal Quote Received: Action Required!";
                appraiserMail.To.Add(new MailAddress(toEmail));

                string appraiserMessage = $"Dear Broker's,\n\n";
                appraiserMessage += $"We're pleased to share that one of our esteemed appraisers has submitted a new quote for the property you listed.\n\n";
                appraiserMessage += $"Appraiser's Quote Details:\n";
                appraiserMessage += $"• Property: [{property.City},{property.StreetName},{property.StreetNumber},{property.ZipCode}]\n";
                appraiserMessage += $"• Appraised Value: [{bid.BidAmount}]\n";
                appraiserMessage += $"• Date of Appraisal: [{DateTime.Now}]\n\n";
                appraiserMessage += $"Your prompt attention to this quote is appreciated. Please login to our platform to review the details and proceed accordingly.\n\n";
                appraiserMessage += $"[Login](<a\"https://appraisal-eta.vercel.app/>) || [Appraisal Link](<a\"https://appraisal-eta.vercel.app/>)\n\n";
                appraiserMessage += $"Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land\n";

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
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public async Task<List<DBL.Models.Bid>> getAllAppraiserBidAsync(int orderId)
        {
            var orderDetail = _context.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();
            if (orderDetail != null)
            {
                var bids = _context.Bids.Where(x => x.OrderId == orderId).OrderBy(x => x.RequestTime).ToList();

                return bids;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        public Task<List<DBL.Models.Bid>> getAppraiserBidbyId(long propertyId)
        {
            var bids = _context.Bids.Where(x => x.OrderId == propertyId).OrderByDescending(x => x.RequestTime).ToList();
            if (bids != null)
            {
                return Task.FromResult(bids);
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <returns></returns>
        public Task<DBL.Models.Bid> AcceptBidAsync(int bidId)
        {
            DateTime utcNow = DateTime.UtcNow;
            TimeZoneInfo estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            DateTime estTime = TimeZoneInfo.ConvertTimeFromUtc(utcNow, estZone);

            var bidDetail = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();
            if (bidDetail != null)
            {
                bidDetail.Status = 1;
                bidDetail.ResponseTime = estTime; // Need to convert to Est 
                _context.Bids.Update(bidDetail);
                _context.SaveChanges();
                SendMailAcceptQuotes(bidId);
                return Task.FromResult(bidDetail);
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <returns></returns>
        public bool SendMailAcceptQuotes(int bidId)
        {
            try
            {
                var bidDetail = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();

                if (bidDetail != null)
                {
                    var email = _context.UserInformations.Where(x => x.UserId == bidDetail.UserId).Select(x => x.Email).FirstOrDefault();

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

                    NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = credential,
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <returns></returns>
        public bool SendMailDeclineQuotes(int bidId)
        {
            try
            {
                var bidDetail = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();

                if (bidDetail != null)
                {
                    var email = _context.UserInformations.Where(x => x.UserId == bidDetail.UserId).Select(x => x.Email).FirstOrDefault();

                    string pswd = "odkzjyvtiwmtdjtq";
                    MailMessage appraiserMail = new MailMessage();
                    appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                    appraiserMail.Subject = "Property Appraisal Quote Rejected";
                    appraiserMail.To.Add(new MailAddress(email));

                    string appraiserMessage = $"Dear Appraiser's,\n\n";
                    appraiserMessage += $"We regret to inform you that the broker has rejected your quote for the property (order ID:{bidDetail.OrderId}). Thank you for your time and effort.\n\n";
                    appraiserMessage += "Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                    appraiserMessage += "Best regards,\n";
                    appraiserMessage += "Support Team\n";
                    appraiserMessage += "Appraisal Land";

                    appraiserMail.Body = appraiserMessage;

                    NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = credential,
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <returns></returns>
        public Task<DBL.Models.Bid> DeclineBidAsync(int bidId)
        {
            DateTime utcNow = DateTime.UtcNow;
            TimeZoneInfo estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            DateTime estTime = TimeZoneInfo.ConvertTimeFromUtc(utcNow, estZone);

            var bidDetail = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();
            if (bidDetail != null)
            {
                bidDetail.Status = 2;
                bidDetail.ResponseTime = estTime;
                _context.Bids.Update(bidDetail);
                _context.SaveChanges();
                SendMailDeclineQuotes(bidId);
                return Task.FromResult(bidDetail);
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <param name="bid"></param>
        /// <returns></returns>
        public async Task<DBL.Models.Bid> UpdateBid(long bidId, Classes.Bid bid)
        {
            try
            {
                DateTime utcNow = DateTime.UtcNow;
                TimeZoneInfo estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime estTime = TimeZoneInfo.ConvertTimeFromUtc(utcNow, estZone);

                var bidDetail = _context.Bids.Where(x => x.BidId == bidId).FirstOrDefault();
                if (bidDetail != null)
                {
                    bidDetail.OrderId = bid.OrderId;
                    bidDetail.UserId = bid.UserId;
                    bidDetail.AppraiserUserId = bid.AppraiserUserId;
                    bidDetail.RequestTime = estTime;
                    bidDetail.Status = bid.Status;
                    bidDetail.Description = bid.Description;
                    bidDetail.BidAmount = bid.BidAmount;
                    bidDetail.BidLowerRange = bid.BidLowerRange;
                    bidDetail.BidUpperRange = bid.BidUpperRange;

                    _context.Bids.Update(bidDetail);
                    _context.SaveChanges();

                    return bidDetail;
                }
            }
            catch (Exception ex)
            {
                var _ex = ex;
                return null;

            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Task<List<DBL.Models.Bid>> getAppraiserBidbyUserID(long userId)
        {
            var bids = _context.Bids.Where(x => x.UserId == userId).ToList();
            if (bids != null)
            {
                return Task.FromResult(bids);
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="quote"></param>
        /// <returns></returns>
        public DBL.Models.Bid UpdateStatus(QuoteClass quote)
        {
            try
            {
                DateTime utcNow = DateTime.UtcNow;
                TimeZoneInfo estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime estTime = TimeZoneInfo.ConvertTimeFromUtc(utcNow, estZone);

                var bidDetail = _context.Bids.Where(x => x.BidId == quote.QuoteId).FirstOrDefault();
                if (bidDetail != null)
                {
                    bidDetail.OrderStatus = quote.OrderStatus;
                    bidDetail.Remark = quote.Remark;
                    bidDetail.ModifiedDate = estTime;
                    bidDetail.StatusDate = quote.StatusDate;
                    _context.Bids.Update(bidDetail);
                    _context.SaveChanges();
                    return bidDetail;
                }
            }
            catch (Exception ex)
            {
                var _ex = ex;
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Task<List<DBL.Models.Bid>> getAllQuotesByAppraiser()
        {
            var bidDetails = _context.Bids.ToList();
            if (bidDetails != null)
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