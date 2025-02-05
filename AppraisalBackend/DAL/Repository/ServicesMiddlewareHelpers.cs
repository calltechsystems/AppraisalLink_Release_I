using PayPal.Api;

namespace DAL.Repository;

public class ServicesMiddlewareHelpers
{
    public Dictionary<string, string> GetConfig()
    {
        return ConfigManager.Instance.GetProperties();
    }

    private string GetAccessToken(string clientId, string clientSecret)
    {
        var accessToken = new OAuthTokenCredential(clientId, clientSecret, GetConfig()).GetAccessToken();
        return accessToken;
    }

    public APIContext GetAPIContext(string clientId, string clientSecret)
    {
        var apiContext = new APIContext(GetAccessToken(clientId, clientSecret));
        apiContext.Config = GetConfig();
        return apiContext;
    }
}