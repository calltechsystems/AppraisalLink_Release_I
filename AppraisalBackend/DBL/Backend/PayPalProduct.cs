namespace DBL.Backend;

public class PayPalProduct
{
    //public long Id { get; set; }
    //public string Name { get; set; }
    //public string Description { get; set; }
    //public double UnitPrice { get; set; }
    //public string SKU { get; set; }
    //public int OrderQty { get; set; }
    //public string CurrencyCode { get; set; }
    //public double Tax { get; set; }


    public short Id { get; set; }
    public string ReturnUrl { get; set; }
    public string PlanName { get; set; } = null!;
    public double Amount { get; set; }
    public int NoOfProperties { get; set; }
    public string CurrencyCode { get; set; }
    public string Description { get; set; }
}