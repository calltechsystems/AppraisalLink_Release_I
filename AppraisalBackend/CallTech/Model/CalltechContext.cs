using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CallTech.Model;

public partial class CalltechContext : DbContext
{
    public CalltechContext()
    {
    }

    public CalltechContext(DbContextOptions<CalltechContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Broker> Brokers { get; set; }

    public virtual DbSet<Brokerage> Brokerages { get; set; }

    public virtual DbSet<Plan> Plans { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<TransactionLog> TransactionLogs { get; set; }

    public virtual DbSet<UserInformation> UserInformations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=calltechsqlproject.database.windows.net;Initial Catalog=calltech;Persist Security Info=False;User ID=calltechsqlproject;Password=Azure@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Broker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Brokers__3214EC27CEC5EBB0");

            entity.HasIndex(e => e.AssistantPhoneNumber, "IX_Assistant_Phone_Number")
                .IsUnique()
                .HasFilter("([Assistant_Phone_Number] IS NOT NULL)");

            entity.HasIndex(e => e.MortageBrokerLicNo, "IX_Mortage_Broker_Lic_No")
                .IsUnique()
                .HasFilter("([Mortage_Broker_Lic_No] IS NOT NULL)");

            entity.HasIndex(e => e.MortageBrokerageLicNo, "IX_Mortage_Brokerage_Lic_No")
                .IsUnique()
                .HasFilter("([Mortage_Brokerage_Lic_No] IS NOT NULL)");

            entity.HasIndex(e => e.PhoneNumber, "IX_PHONE_NUMBER")
                .IsUnique()
                .HasFilter("([Phone_number] IS NOT NULL)");

            entity.HasIndex(e => e.PhoneNumber, "IX_unique_null")
                .IsUnique()
                .HasFilter("([Phone_number] IS NOT NULL)");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AdressLine1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Adress_Line_1");
            entity.Property(e => e.AdressLine2)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Adress_line_2");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Assistant_First_Name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Assistant_Phone_Number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Brokerage_name");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Company_Name");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Last_Name");
            entity.Property(e => e.LicenseNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("License_No");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Middle_Name");
            entity.Property(e => e.MortageBrokerLicNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Mortage_Broker_Lic_No");
            entity.Property(e => e.MortageBrokerageLicNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Mortage_Brokerage_Lic_No");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Phone_number");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Profile_Image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Zip_code");

            entity.HasOne(d => d.User).WithMany(p => p.Brokers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Brokers__UserID__0B91BA14");
        });

        modelBuilder.Entity<Brokerage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Brokerag__3214EC270BABA0D1");

            entity.ToTable("Brokerage");

            entity.HasIndex(e => e.AssistantPhoneNumber, "IX_Assistant_Phone_Number")
                .IsUnique()
                .HasFilter("([Assistant_Phone_Number] IS NOT NULL)");

            entity.HasIndex(e => e.MortageBrokerLicNo, "IX_Mortage_Broker_Lic_No")
                .IsUnique()
                .HasFilter("([Mortage_Broker_Lic_No] IS NOT NULL)");

            entity.HasIndex(e => e.MortageBrokerageLicNo, "IX_Mortage_Brokerage_Lic_No")
                .IsUnique()
                .HasFilter("([Mortage_Brokerage_Lic_No] IS NOT NULL)");

            entity.HasIndex(e => e.PhoneNumber, "IX_PHONE_NUMBER")
                .IsUnique()
                .HasFilter("([Phone_number] IS NOT NULL)");

            entity.HasIndex(e => new { e.PhoneNumber, e.MortageBrokerLicNo, e.MortageBrokerageLicNo, e.AssistantPhoneNumber }, "IX_unique_null_1").IsUnique();

            entity.HasIndex(e => e.MortageBrokerageLicNo, "UQ__Brokerag__520A89C6F200714C").IsUnique();

            entity.HasIndex(e => e.AssistantPhoneNumber, "UQ__Brokerag__55A0F1C68C249610").IsUnique();

            entity.HasIndex(e => e.LicenseNo, "UQ__Brokerag__5CA8EF6C3DCDAE8C").IsUnique();

            entity.HasIndex(e => e.PhoneNumber, "UQ__Brokerag__7E87EC67434E362C").IsUnique();

            entity.HasIndex(e => e.MortageBrokerLicNo, "UQ__Brokerag__BD86A4BD5CAF3247").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AdressLine1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Adress_Line_1");
            entity.Property(e => e.AdressLine2)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Adress_line_2");
            entity.Property(e => e.Area)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AssistantFirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Assistant_First_Name");
            entity.Property(e => e.AssistantPhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Assistant_Phone_Number");
            entity.Property(e => e.BrokerageName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Brokerage_name");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CompanyName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Company_Name");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Last_Name");
            entity.Property(e => e.LicenseNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("License_No");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Middle_Name");
            entity.Property(e => e.MortageBrokerLicNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Mortage_Broker_Lic_No");
            entity.Property(e => e.MortageBrokerageLicNo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Mortage_Brokerage_Lic_No");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Phone_number");
            entity.Property(e => e.ProfileImage)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Profile_Image");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Zip_code");

            entity.HasOne(d => d.User).WithMany(p => p.Brokerages)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Brokerage__UserI__6C190EBB");
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Plans__3214EC27AF3A8A3A");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NoOfProperties).HasColumnName("No_of_Properties");
            entity.Property(e => e.PlanName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Plan_Name");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("PK__Properti__2757E6D6DEAB11DA");

            entity.Property(e => e.PropertyId).HasColumnName("Property_Id");
            entity.Property(e => e.AddedDatetime)
                .HasColumnType("datetime")
                .HasColumnName("Added_Datetime");
            entity.Property(e => e.ApplicantEmailAddress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Applicant_Email_Address");
            entity.Property(e => e.ApplicantFirstName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Applicant_First_Name");
            entity.Property(e => e.ApplicantLastName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Applicant_Last_Name");
            entity.Property(e => e.ApplicantPhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Applicant_Phone_Number");
            entity.Property(e => e.Area)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.BidLowerRange).HasColumnName("Bid_Lower_Range");
            entity.Property(e => e.BidUpperRange).HasColumnName("Bid_Upper_Range");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Community)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDatetime)
                .HasColumnType("datetime")
                .HasColumnName("Modified_Datetime");
            entity.Property(e => e.PropertyStatus).HasColumnName("Property_Status");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.StreetName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Street_Name");
            entity.Property(e => e.StreetNumber)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Street_Number");
            entity.Property(e => e.TypeOfBuilding)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Type_of_Building");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Zip_Code");

            entity.HasOne(d => d.User).WithMany(p => p.Properties)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Properties_User_Information");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("PK__Subscrip__518059B180211CF0");

            entity.Property(e => e.SubscriptionId).HasColumnName("Subscription_ID");
            entity.Property(e => e.EndDate)
                .HasColumnType("datetime")
                .HasColumnName("End_Date");
            entity.Property(e => e.PlanId).HasColumnName("Plan_ID");
            entity.Property(e => e.StartDate)
                .HasColumnType("datetime")
                .HasColumnName("Start_Date");
            entity.Property(e => e.TotalProperties).HasColumnName("Total_Properties");
            entity.Property(e => e.UsedProperties)
                .HasDefaultValueSql("((0))")
                .HasColumnName("Used_Properties");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Plan).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.PlanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Subscript__Plan___72C60C4A");

            entity.HasOne(d => d.User).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Subscriptions_User_Information");
        });

        modelBuilder.Entity<TransactionLog>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__9A8C4A3D4FD47374");

            entity.ToTable("Transaction_Logs");

            entity.Property(e => e.TransactionId).HasColumnName("Transaction_id");
            entity.Property(e => e.TransactionDetail)
                .IsUnicode(false)
                .HasColumnName("Transaction_detail");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.TransactionLogs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Transaction_Logs_User_Information");
        });

        modelBuilder.Entity<UserInformation>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User_Inf__1788CCAC54B179A2");

            entity.ToTable("User_Information");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedDateTime).HasColumnName("Created_Date_Time");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.ForgotPasswordToken).HasColumnName("Forgot_Password_Token");
            entity.Property(e => e.IsActive).HasColumnName("Is_Active");
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.PasswordHash).HasColumnName("Password_Hash");
            entity.Property(e => e.PasswordSalt).HasColumnName("Password_Salt");
            entity.Property(e => e.UserType).HasColumnName("User_Type");
            entity.Property(e => e.VerifyEmailToken).HasColumnName("Verify_Email_Token");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
