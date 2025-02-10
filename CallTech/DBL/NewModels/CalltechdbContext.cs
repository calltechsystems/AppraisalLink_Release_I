using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DBL.NewModels;

public partial class CalltechdbContext : DbContext
{
    private readonly IConfiguration _configuration;
    public CalltechdbContext()
    {
    }

    public CalltechdbContext(DbContextOptions<CalltechdbContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Appraiser> Appraisers { get; set; }

    public virtual DbSet<AppraiserCompany> AppraiserCompanies { get; set; }

    public virtual DbSet<Bid> Bids { get; set; }

    public virtual DbSet<Broker> Brokers { get; set; }

    public virtual DbSet<Brokerage> Brokerages { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Plan> Plans { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<TransactionLog> TransactionLogs { get; set; }

    public virtual DbSet<UserInformation> UserInformations { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Connectionstring"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appraiser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("appraisers_pkey");

            entity.ToTable("appraisers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdressLine1)
                .HasMaxLength(100)
                .HasColumnName("adress_line_1");
            entity.Property(e => e.AdressLine2)
                .HasMaxLength(100)
                .HasColumnName("adress_line_2");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("phone_number");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .HasColumnName("zip_code");
        });

        modelBuilder.Entity<AppraiserCompany>(entity =>
        {
            entity.HasKey(e => e.AppraiserCompanyId).HasName("appraiser_company_pkey");

            entity.ToTable("appraiser_company");

            entity.Property(e => e.AppraiserCompanyId).HasColumnName("appraiser_company_id");
            entity.Property(e => e.AddressLineOne)
                .HasMaxLength(200)
                .HasColumnName("address_line_one");
            entity.Property(e => e.AddressLineTwo)
                .HasMaxLength(200)
                .HasColumnName("address_line_two");
            entity.Property(e => e.AppraiserCompanyName)
                .HasMaxLength(100)
                .HasColumnName("appraiser_company_name");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.LicenseNumber)
                .HasMaxLength(100)
                .HasColumnName("license_number");
            entity.Property(e => e.OfficeContactEmail)
                .HasMaxLength(100)
                .HasColumnName("office_contact_email");
            entity.Property(e => e.OfficeContactFirstName)
                .HasMaxLength(50)
                .HasColumnName("office_contact_first_name");
            entity.Property(e => e.OfficeContactLastName)
                .HasMaxLength(50)
                .HasColumnName("office_contact_last_name");
            entity.Property(e => e.OfficeContactPhone)
                .HasMaxLength(20)
                .HasColumnName("office_contact_phone");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .HasColumnName("phone_number");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .HasColumnName("postal_code");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Bid>(entity =>
        {
            entity.HasKey(e => e.BidId).HasName("bid_pkey");

            entity.ToTable("bid");

            entity.Property(e => e.BidId).HasColumnName("bid_id");
            entity.Property(e => e.AppraiserUserId).HasColumnName("appraiser_user_id");
            entity.Property(e => e.BidAmount).HasColumnName("bid_amount");
            entity.Property(e => e.BidLowerRange).HasColumnName("bid_lower_range");
            entity.Property(e => e.BidUpperRange).HasColumnName("bid_upper_range");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .HasColumnName("description");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.RequestTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("request_time");
            entity.Property(e => e.ResponseTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("response_time");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("userid");
        });

        modelBuilder.Entity<Broker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("brokers_pkey");

            entity.ToTable("brokers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdressLine1)
                .HasMaxLength(100)
                .HasColumnName("adress_line_1");
            entity.Property(e => e.AdressLine2)
                .HasMaxLength(100)
                .HasColumnName("adress_line_2");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_first_name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_phone_number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .HasColumnName("brokerage_name");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.LicenseNo)
                .HasMaxLength(100)
                .HasColumnName("license_no");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .HasColumnName("middle_name");
            entity.Property(e => e.MortageBrokerLicNo)
                .HasMaxLength(100)
                .HasColumnName("mortage_broker_lic_no");
            entity.Property(e => e.MortageBrokerageLicNo)
                .HasMaxLength(100)
                .HasColumnName("mortage_brokerage_lic_no");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("phone_number");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .HasColumnName("zip_code");
        });

        modelBuilder.Entity<Brokerage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("brokerage_pkey");

            entity.ToTable("brokerage");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdressLine1)
                .HasMaxLength(100)
                .HasColumnName("adress_line_1");
            entity.Property(e => e.AdressLine2)
                .HasMaxLength(100)
                .HasColumnName("adress_line_2");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_first_name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_phone_number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .HasColumnName("brokerage_name");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.LicenseNo)
                .HasMaxLength(100)
                .HasColumnName("license_no");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .HasColumnName("middle_name");
            entity.Property(e => e.MortageBrokerLicNo)
                .HasMaxLength(100)
                .HasColumnName("mortage_broker_lic_no");
            entity.Property(e => e.MortageBrokerageLicNo)
                .HasMaxLength(100)
                .HasColumnName("mortage_brokerage_lic_no");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("phone_number");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .HasColumnName("zip_code");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("notifications_pkey");

            entity.ToTable("notifications");

            entity.Property(e => e.NotificationId).HasColumnName("notification_id");
            entity.Property(e => e.IsSeen).HasColumnName("is_seen");
            entity.Property(e => e.Message)
                .HasMaxLength(250)
                .HasColumnName("message");
            entity.Property(e => e.ReceiverId).HasColumnName("receiver_id");
            entity.Property(e => e.SenderId).HasColumnName("sender_id");
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("plans_pkey");

            entity.ToTable("plans");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Currencycode)
                .HasMaxLength(50)
                .HasColumnName("currencycode");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .HasColumnName("description");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.MonthlyAmount).HasColumnName("monthly_amount");
            entity.Property(e => e.NoOfProperties).HasColumnName("no_of_properties");
            entity.Property(e => e.PlanName)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("plan_name");
            entity.Property(e => e.Returnurl).HasColumnName("returnurl");
            entity.Property(e => e.YearlyAmount).HasColumnName("yearly_amount");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("properties_pkey");

            entity.ToTable("properties");

            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.AddedDatetime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("added_datetime");
            entity.Property(e => e.ApplicantEmailAddress)
                .HasMaxLength(100)
                .HasColumnName("applicant_email_address");
            entity.Property(e => e.ApplicantFirstName)
                .HasMaxLength(100)
                .HasColumnName("applicant_first_name");
            entity.Property(e => e.ApplicantLastName)
                .HasMaxLength(100)
                .HasColumnName("applicant_last_name");
            entity.Property(e => e.ApplicantPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("applicant_phone_number");
            entity.Property(e => e.Area)
                .HasMaxLength(20)
                .HasColumnName("area");
            entity.Property(e => e.BidLowerRange).HasColumnName("bid_lower_range");
            entity.Property(e => e.BidUpperRange).HasColumnName("bid_upper_range");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Community)
                .HasMaxLength(50)
                .HasColumnName("community");
            entity.Property(e => e.ModifiedDatetime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("modified_datetime");
            entity.Property(e => e.PropertyStatus).HasColumnName("property_status");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.StreetName)
                .HasMaxLength(50)
                .HasColumnName("street_name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .HasColumnName("street_number");
            entity.Property(e => e.TypeOfBuilding)
                .HasMaxLength(100)
                .HasColumnName("type_of_building");
            entity.Property(e => e.Urgency).HasColumnName("urgency");
            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .HasColumnName("zip_code");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("subscriptions_pkey");

            entity.ToTable("subscriptions");

            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("start_date");
            entity.Property(e => e.TotalProperties).HasColumnName("total_properties");
            entity.Property(e => e.UsedProperties).HasColumnName("used_properties");
            entity.Property(e => e.UserId).HasColumnName("userid");
        });

        modelBuilder.Entity<TransactionLog>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("transaction_logs_pkey");

            entity.ToTable("transaction_logs");

            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.Paymentid)
                .HasMaxLength(100)
                .HasColumnName("paymentid");
            entity.Property(e => e.TransactionDetail).HasColumnName("transaction_detail");
            entity.Property(e => e.UserId).HasColumnName("userid");
        });

        modelBuilder.Entity<UserInformation>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_information_pkey");

            entity.ToTable("user_information");

            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.CreatedDateTime)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_date_time");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.ForgotPasswordToken).HasColumnName("forgot_password_token");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.PasswordSalt).HasColumnName("password_salt");
            entity.Property(e => e.Resettokenexpiry)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("resettokenexpiry");
            entity.Property(e => e.UserType).HasColumnName("user_type");
            entity.Property(e => e.VerifyEmailToken).HasColumnName("verify_email_token");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("wishlist_pkey");

            entity.ToTable("wishlist");

            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
