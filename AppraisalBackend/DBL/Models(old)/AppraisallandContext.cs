using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DBL.Models;

public partial class AppraisallandContext : DbContext
{
    public AppraisallandContext()
    {
    }

    public AppraisallandContext(DbContextOptions<AppraisallandContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminArchiveProperty> AdminArchiveProperties { get; set; }

    public virtual DbSet<AdminArchiveUser> AdminArchiveUsers { get; set; }

    public virtual DbSet<Agreement> Agreements { get; set; }

    public virtual DbSet<Appraiser> Appraisers { get; set; }

    public virtual DbSet<AppraiserCompany> AppraiserCompanies { get; set; }

    public virtual DbSet<ArchivedAppraiser> ArchivedAppraisers { get; set; }

    public virtual DbSet<ArchivedProperty> ArchivedProperties { get; set; }

    public virtual DbSet<AssignProperty> AssignProperties { get; set; }

    public virtual DbSet<Bid> Bids { get; set; }

    public virtual DbSet<Broker> Brokers { get; set; }

    public virtual DbSet<Brokerage> Brokerages { get; set; }

    public virtual DbSet<ContactUs> Contactus { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<PaymentToken> PaymentTokens { get; set; }

    public virtual DbSet<Plan> Plans { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    //public virtual DbSet<publi> Publics { get; set; }

    public virtual DbSet<RecurringProduct> RecurringProducts { get; set; }

    public virtual DbSet<RecurringSubscription> RecurringSubscriptions { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<Subscriptionplan> Subscriptionplans { get; set; }

    public virtual DbSet<Topup> Topups { get; set; }

    public virtual DbSet<TransactionLog> TransactionLogs { get; set; }

    public virtual DbSet<UserInformation> UserInformations { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=appraisalland.cpiwmskggd56.ca-central-1.rds.amazonaws.com;Port=5432;Database=appraisallands;Username=appraisalland;Password=calltech1234;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminArchiveProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("admin_archive_property_pkey");

            entity.ToTable("admin_archive_property");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
        });

        modelBuilder.Entity<AdminArchiveUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("admin_archive_users_pkey");

            entity.ToTable("admin_archive_users");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Userid).HasColumnName("userid");
        });

        modelBuilder.Entity<Agreement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("agreement_pkey");

            entity.ToTable("agreement");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Paypalagreementid).HasColumnName("paypalagreementid");
            entity.Property(e => e.Startdate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("startdate");
            entity.Property(e => e.Subscriptionid).HasColumnName("subscriptionid");
        });

        modelBuilder.Entity<Appraiser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("appraisers_pkey");

            entity.ToTable("appraisers");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ApartmentNo)
                .HasMaxLength(50)
                .HasColumnName("apartment_no");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.CellNumber).HasColumnType("character varying");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CommissionRate)
                .HasPrecision(10, 2)
                .HasColumnName("commission_rate");
            entity.Property(e => e.CompanyId).HasColumnName("company_Id");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.Designation)
                .HasMaxLength(100)
                .HasColumnName("designation");
            entity.Property(e => e.EmailId)
                .HasColumnType("character varying")
                .HasColumnName("Email_Id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.LenderListUrl)
                .HasMaxLength(500)
                .HasColumnName("Lender_list_Url");
            entity.Property(e => e.MaxNumberOfAssignedOrders).HasColumnName("max_number_of_assigned_orders");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .HasColumnName("middle_name");
            entity.Property(e => e.ModifiedDateTime).HasColumnType("timestamp without time zone");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("phone_number");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .HasColumnName("postal_code");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.StreetName)
                .HasMaxLength(100)
                .HasColumnName("street_name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .HasColumnName("street_number");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<AppraiserCompany>(entity =>
        {
            entity.HasKey(e => e.AppraiserCompanyId).HasName("appraiser_company_pkey");

            entity.ToTable("appraiser_company");

            entity.Property(e => e.AppraiserCompanyId)
                .ValueGeneratedNever()
                .HasColumnName("appraiser_company_id");
            entity.Property(e => e.AddressLineOne)
                .HasMaxLength(200)
                .HasColumnName("address_line_one");
            entity.Property(e => e.AddressLineTwo)
                .HasMaxLength(200)
                .HasColumnName("address_line_two");
            entity.Property(e => e.ApartmentNumber)
                .HasColumnType("character varying")
                .HasColumnName("apartment_Number");
            entity.Property(e => e.AppraiserCompanyName)
                .HasMaxLength(100)
                .HasColumnName("appraiser_company_name");
            entity.Property(e => e.CellNumber).HasColumnType("character varying");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.EmailId)
                .HasColumnType("character varying")
                .HasColumnName("Email_Id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.LenderListUrl)
                .HasMaxLength(500)
                .HasColumnName("Lender_list_Url");
            entity.Property(e => e.LicenseNumber)
                .HasMaxLength(100)
                .HasColumnName("license_number");
            entity.Property(e => e.ModifiedDateTime).HasColumnType("timestamp without time zone");
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
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(500)
                .HasColumnName("profile_image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.StreetName)
                .HasColumnType("character varying")
                .HasColumnName("street_Name ");
            entity.Property(e => e.StreetNumber)
                .HasColumnType("character varying")
                .HasColumnName("street_Number");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<ArchivedAppraiser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("archived_appraiser_pkey");

            entity.ToTable("archived_appraiser");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Userid).HasColumnName("userid");
        });

        modelBuilder.Entity<ArchivedProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("archived_properties_pkey");

            entity.ToTable("archived_properties");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.OrderId).HasColumnName("Order_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<AssignProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("assign_properties_pkey");

            entity.ToTable("assign_properties");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Appraiserid).HasColumnName("appraiserid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.CreatedDateTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_DateTime");
            entity.Property(e => e.Propertyid).HasColumnName("propertyid");
        });

        modelBuilder.Entity<Bid>(entity =>
        {
            entity.HasKey(e => e.BidId).HasName("bid_pkey");

            entity.ToTable("bid");

            entity.Property(e => e.BidId)
                .ValueGeneratedNever()
                .HasColumnName("bid_id");
            entity.Property(e => e.AppraiserName)
                .HasMaxLength(250)
                .HasColumnName("appraiser_name");
            entity.Property(e => e.AppraiserUserId).HasColumnName("appraiser_user_id");
            entity.Property(e => e.Assignedby).HasColumnName("assignedby");
            entity.Property(e => e.BidAmount).HasColumnName("bid_amount");
            entity.Property(e => e.BidLowerRange).HasColumnName("bid_lower_range");
            entity.Property(e => e.BidUpperRange).HasColumnName("bid_upper_range");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .HasColumnName("description");
            entity.Property(e => e.LenderListUrl)
                .HasMaxLength(500)
                .HasColumnName("lender_list_url");
            entity.Property(e => e.ModifiedDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("modified_date");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Orderstatus).HasColumnName("orderstatus");
            entity.Property(e => e.Remark)
                .HasMaxLength(250)
                .HasColumnName("remark");
            entity.Property(e => e.RequestTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("request_time");
            entity.Property(e => e.ResponseTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("response_time");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Statusdate)
                .HasMaxLength(500)
                .HasColumnName("statusdate");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Broker>(entity =>
        {
            entity.ToTable("brokers");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ApartmentNo)
                .HasMaxLength(50)
                .HasColumnName("apartment_no");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.AssistantEmailAddress)
                .HasMaxLength(100)
                .HasColumnName("assistant_email_address");
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_first_name");
            entity.Property(e => e.AssistantLastName)
                .HasMaxLength(50)
                .HasColumnName("assistant_last_name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_phone_number");
            entity.Property(e => e.AssistantTwoEmailAddress)
                .HasMaxLength(100)
                .HasColumnName("assistant_two_email_address");
            entity.Property(e => e.AssistantTwoFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_two_first_name");
            entity.Property(e => e.AssistantTwoLastName)
                .HasMaxLength(50)
                .HasColumnName("assistant_two_last_name");
            entity.Property(e => e.AssistantTwoPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_two_phone_number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .HasColumnName("brokerage_name");
            entity.Property(e => e.Brokerageid).HasColumnName("brokerageid");
            entity.Property(e => e.Cellnumber)
                .HasColumnType("character varying")
                .HasColumnName("cellnumber");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.DateEstablished).HasColumnName("date_established");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EmailId)
                .HasColumnType("character varying")
                .HasColumnName("email_id");
            entity.Property(e => e.FaxNumber)
                .HasMaxLength(20)
                .HasColumnName("fax_number");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Isactive1).HasColumnName("isactive");
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
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .HasColumnName("postal_code");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.StreetName)
                .HasMaxLength(100)
                .HasColumnName("street_name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .HasColumnName("street_number");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Brokerage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("brokerage_pkey");

            entity.ToTable("brokerage");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ApartmentNo)
                .HasMaxLength(50)
                .HasColumnName("apartment_no");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .HasColumnName("area");
            entity.Property(e => e.AssistantEmailAddress)
                .HasMaxLength(100)
                .HasColumnName("assistant_email_address");
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_first_name");
            entity.Property(e => e.AssistantLastName)
                .HasMaxLength(50)
                .HasColumnName("assistant_last_name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_phone_number");
            entity.Property(e => e.AssistantTwoEmailAddress)
                .HasMaxLength(100)
                .HasColumnName("assistant_two_email_address");
            entity.Property(e => e.AssistantTwoFirstName)
                .HasMaxLength(50)
                .HasColumnName("assistant_two_first_name");
            entity.Property(e => e.AssistantTwoLastName)
                .HasMaxLength(50)
                .HasColumnName("assistant_two_last_name");
            entity.Property(e => e.AssistantTwoPhoneNumber)
                .HasMaxLength(13)
                .HasColumnName("assistant_two_phone_number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .HasColumnName("brokerage_name");
            entity.Property(e => e.Cellnumber)
                .HasColumnType("character varying")
                .HasColumnName("cellnumber");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .HasColumnName("company_name");
            entity.Property(e => e.DateEstablished).HasColumnName("date_established");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EmailId)
                .HasColumnType("character varying")
                .HasColumnName("email_id");
            entity.Property(e => e.FaxNumber)
                .HasMaxLength(20)
                .HasColumnName("fax_number");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
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
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .HasColumnName("postal_code");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .HasColumnName("profile_image");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.StreetName)
                .HasMaxLength(100)
                .HasColumnName("street_name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .HasColumnName("street_number");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<ContactUs>(entity =>
        {
            entity.HasKey(e => e.ContactusId).HasName("contactus_pkey");

            entity.ToTable("contactus");

            entity.Property(e => e.ContactusId)
                .ValueGeneratedNever()
                .HasColumnName("contactus_id");
            entity.Property(e => e.Company)
                .HasMaxLength(100)
                .HasColumnName("company");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EmailAddress)
                .HasMaxLength(100)
                .HasColumnName("email_address");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("phone_number");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.Subject)
                .HasMaxLength(255)
                .HasColumnName("subject");
            entity.Property(e => e.UserLoggedIn).HasColumnName("user_logged_in");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("notifications_pkey");

            entity.ToTable("notifications");

            entity.Property(e => e.NotificationId)
                .ValueGeneratedNever()
                .HasColumnName("notification_id");
            entity.Property(e => e.IsSeen).HasColumnName("is_seen");
            entity.Property(e => e.Message)
                .HasMaxLength(250)
                .HasColumnName("message");
            entity.Property(e => e.ReceiverId).HasColumnName("receiver_id");
            entity.Property(e => e.SenderId).HasColumnName("sender_id");
        });

        modelBuilder.Entity<PaymentToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("payment_tokens_pkey");

            entity.ToTable("payment_tokens");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Currentdatetime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("currentdatetime");
            entity.Property(e => e.Planid).HasColumnName("planid");
            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasColumnName("token");
            entity.Property(e => e.TopUpId).HasColumnName("topUpId");
            entity.Property(e => e.Userid).HasColumnName("userid");
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("plans_pkey");

            entity.ToTable("plans");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
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
            entity.Property(e => e.UserType).HasColumnName("user_type");
            entity.Property(e => e.YearlyAmount).HasColumnName("yearly_amount");
        });

        //modelBuilder.Entity<Product>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("product_pkey");

        //    entity.ToTable("product");

        //    entity.Property(e => e.id)
        //        .ValueGeneratedNever()
        //        .HasColumnName("id");
        //    entity.Property(e => e.CreateTime).HasColumnName("create_time");
        //    entity.Property(e => e.Description).HasColumnName("description");
        //    entity.Property(e => e.InkHrefEdit).HasColumnName("ink_href_edit");
        //    entity.Property(e => e.LinkHrefGet).HasColumnName("link_href_get");
        //    entity.Property(e => e.Name).HasColumnName("name");
        //});

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("properties_pkey");

            entity.ToTable("properties");

            entity.Property(e => e.PropertyId)
                .ValueGeneratedNever()
                .HasColumnName("property_id");
            entity.Property(e => e.AddedDatetime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("added_datetime");
            entity.Property(e => e.ApplicantAddress)
                .HasMaxLength(100)
                .HasColumnName("applicant_address");
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
            entity.Property(e => e.Attachment)
                .HasColumnType("character varying")
                .HasColumnName("attachment");
            entity.Property(e => e.BidLowerRange).HasColumnName("bid_lower_range");
            entity.Property(e => e.BidUpperRange).HasColumnName("bid_upper_range");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Community)
                .HasMaxLength(50)
                .HasColumnName("community");
            entity.Property(e => e.EstimatedValue).HasColumnName("estimated_value");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .HasColumnName("image");
            entity.Property(e => e.IsArchive).HasColumnName("is_archive");
            entity.Property(e => e.IsArchiveappraiser).HasColumnName("is_archiveappraiser");
            entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
            entity.Property(e => e.Isoncancel).HasColumnName("isoncancel");
            entity.Property(e => e.Isonhold).HasColumnName("isonhold");
            entity.Property(e => e.LenderInformation)
                .HasColumnType("character varying")
                .HasColumnName("lender_information");
            entity.Property(e => e.ModifiedDatetime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("modified_datetime");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Orderstatus).HasColumnName("orderstatus");
            entity.Property(e => e.PropertyStatus).HasColumnName("property_status");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.Purpose)
                .HasColumnType("character varying")
                .HasColumnName("purpose");
            entity.Property(e => e.QuoteRequiredDate)
                .HasColumnType("character varying")
                .HasColumnName("quote_required_date");
            entity.Property(e => e.Remark)
                .HasColumnType("character varying")
                .HasColumnName("remark");
            entity.Property(e => e.Sqft).HasColumnName("sqft");
            entity.Property(e => e.StreetName)
                .HasMaxLength(50)
                .HasColumnName("street_name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .HasColumnName("street_number");
            entity.Property(e => e.TypeOfAppraisal)
                .HasColumnType("character varying")
                .HasColumnName("type_of_appraisal");
            entity.Property(e => e.TypeOfBuilding)
                .HasMaxLength(100)
                .HasColumnName("type_of_building");
            entity.Property(e => e.Urgency).HasColumnName("urgency");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .HasColumnName("zip_code");
        });

        //modelBuilder.Entity<Public>(entity =>
        //{
        //    entity
        //        .HasNoKey()
        //        .ToTable("public");

        //    entity.Property(e => e.Addedtime).HasColumnName("addedtime");
        //    entity.Property(e => e.Addedtime1)
        //        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        //        .HasColumnType("timestamp without time zone")
        //        .HasColumnName("addedtime1");
        //    entity.Property(e => e.Id).HasColumnName("id");
        //});

        modelBuilder.Entity<RecurringProduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("recurring_product_pkey");

            entity.ToTable("recurring_product");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RecurringSubscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("recurring_subscriptions_pkey");

            entity.ToTable("recurring_subscriptions");

            entity.Property(e => e.SubscriptionId)
                .ValueGeneratedNever()
                .HasColumnName("subscription_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.TopUpId).HasColumnName("topUp_id");
            entity.Property(e => e.TotalProperties).HasColumnName("total_properties");
            entity.Property(e => e.UsedProperties).HasColumnName("used_properties");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("subscriptions_pkey");

            entity.ToTable("subscriptions");

            entity.Property(e => e.SubscriptionId)
                .ValueGeneratedNever()
                .HasColumnName("subscription_id");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("start_date");
            entity.Property(e => e.TopUpId).HasColumnName("topUp_id");
            entity.Property(e => e.TotalProperties).HasColumnName("total_properties");
            entity.Property(e => e.UsedProperties).HasColumnName("used_properties");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Subscriptionplan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("subscriptionplans_pkey");

            entity.ToTable("subscriptionplans");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Amount)
                .HasPrecision(18, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Cancelurl)
                .HasMaxLength(255)
                .HasColumnName("cancelurl");
            entity.Property(e => e.Cycles).HasColumnName("cycles");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Frequency)
                .HasMaxLength(50)
                .HasColumnName("frequency");
            entity.Property(e => e.Frequencyinterval).HasColumnName("frequencyinterval");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Returnurl)
                .HasMaxLength(255)
                .HasColumnName("returnurl");
            entity.Property(e => e.Setupfee)
                .HasPrecision(18, 2)
                .HasColumnName("setupfee");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Topup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("topup_pkey");

            entity.ToTable("topup");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Currencycode).HasMaxLength(50);
            entity.Property(e => e.NoOfProperties).HasColumnName("no_of_properties");
            entity.Property(e => e.ReturnUrl).HasColumnName("returnUrl");
            entity.Property(e => e.TopupDescription).HasColumnName("topup_description");
            entity.Property(e => e.Topupname)
                .HasMaxLength(255)
                .HasColumnName("topupname");
            entity.Property(e => e.TupUpAmount).HasColumnName("tup_up_amount");
            entity.Property(e => e.UserType).HasColumnName("user_type");
        });

        modelBuilder.Entity<TransactionLog>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("transaction_logs_pkey");

            entity.ToTable("transaction_logs");

            entity.Property(e => e.TransactionId)
                .ValueGeneratedNever()
                .HasColumnName("transaction_id");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_time");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.IsActive).HasColumnName("Is_Active");
            entity.Property(e => e.NoOfProperties).HasColumnName("no_of_properties");
            entity.Property(e => e.Paymentid)
                .HasMaxLength(100)
                .HasColumnName("paymentid");
            entity.Property(e => e.PlanAmount).HasColumnName("plan_amount");
            entity.Property(e => e.PlanName)
                .HasColumnType("character varying")
                .HasColumnName("plan_name");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("start_date");
            entity.Property(e => e.TotalProperties).HasColumnName("total_properties");
            entity.Property(e => e.TransactionDetail).HasColumnName("transaction_detail");
            entity.Property(e => e.UsedProperties).HasColumnName("used_properties");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<UserInformation>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_information_pkey");

            entity.ToTable("user_information");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.CreatedDateTime)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_date_time");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.ForgotPasswordToken).HasColumnName("forgot_password_token");
            entity.Property(e => e.GetEmail)
                .HasDefaultValueSql("1")
                .HasColumnName("get_email");
            entity.Property(e => e.GetSms)
                .HasDefaultValueSql("1")
                .HasColumnName("get_sms");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
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
            entity.HasKey(e => e.Id).HasName("wishlist_pkey");

            entity.ToTable("wishlist");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AddedDateTime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("added_dateTime");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
