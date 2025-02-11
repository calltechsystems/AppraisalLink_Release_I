namespace DAL.Classes
{
    public class DateTimeHelper
    {
        private static readonly TimeZoneInfo EasternTimeZone =
        TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");

        public static DateTime GetEasternTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, EasternTimeZone);
        }
    }
}
