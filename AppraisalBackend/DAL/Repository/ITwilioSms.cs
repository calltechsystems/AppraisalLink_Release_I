namespace DAL.Repository;

public interface ITwilioSms
{
    string SendSms(string toPhoneNumber, string message);
}