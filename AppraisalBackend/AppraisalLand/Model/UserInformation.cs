using System;
using System.Collections.Generic;

namespace CallTech.Model;

public partial class UserInformation
{
    public long UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime? CreatedDateTime { get; set; }

    public byte[] PasswordSalt { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public short UserType { get; set; }

    public string? ForgotPasswordToken { get; set; }

    public string VerifyEmailToken { get; set; } = null!;

    public virtual ICollection<Brokerage> Brokerages { get; set; } = new List<Brokerage>();

    public virtual ICollection<Broker> Brokers { get; set; } = new List<Broker>();

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    public virtual ICollection<TransactionLog> TransactionLogs { get; set; } = new List<TransactionLog>();
}
