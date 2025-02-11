using PayPal.Api;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class ServicesMiddlewareHelpers
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> GetConfig()
        {

            return ConfigManager.Instance.GetProperties();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="clientSecret"></param>
        /// <returns></returns>
        private string GetAccessToken(string clientId, string clientSecret)
        {
            string accessToken = new OAuthTokenCredential(clientId, clientSecret, GetConfig()).GetAccessToken();
            return accessToken;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="clientSecret"></param>
        /// <returns></returns>
        public APIContext GetAPIContext(string clientId, string clientSecret)
        {
            APIContext apiContext = new APIContext(GetAccessToken(clientId, clientSecret));
            apiContext.Config = GetConfig();
            return apiContext;
        }
    }
}