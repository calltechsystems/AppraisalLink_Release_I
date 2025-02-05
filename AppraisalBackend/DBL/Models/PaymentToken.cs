namespace DBL.Models;

public class PaymentToken
{
    public int Id { get; set; }

    public int? Userid { get; set; }

    public int? Planid { get; set; }

    public string? Token { get; set; }

    public DateTime Currentdatetime { get; set; }

    public int? TopUpId { get; set; }
}