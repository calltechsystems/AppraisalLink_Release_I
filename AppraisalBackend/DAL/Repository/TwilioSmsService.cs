using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class TwilioSmsService : ITwilioSms
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _twilioPhoneNumber;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountSid"></param>
        /// <param name="authToken"></param>
        /// <param name="twilioPhoneNumber"></param>
        public TwilioSmsService(string accountSid, string authToken, string twilioPhoneNumber)
        {
            _accountSid = accountSid;
            _authToken = authToken;
            _twilioPhoneNumber = twilioPhoneNumber;

            TwilioClient.Init(_accountSid, _authToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="toPhoneNumber"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public string SendSms(string toPhoneNumber, string message)
        {
            try
            {
                var messageOptions = new CreateMessageOptions(
                        new PhoneNumber(toPhoneNumber))
                {
                    From = new PhoneNumber(_twilioPhoneNumber),
                    Body = message
                };

                var messageResponse = MessageResource.Create(messageOptions);
                Console.WriteLine(messageResponse.Sid);
                return messageResponse.Sid;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
