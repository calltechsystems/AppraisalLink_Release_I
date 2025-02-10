using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DBL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin_archive_property",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    order_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("admin_archive_property_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "admin_archive_users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    userid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("admin_archive_users_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "agreement",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    startdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    paypalagreementid = table.Column<string>(type: "text", nullable: true),
                    subscriptionid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("agreement_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "appraiser_company",
                columns: table => new
                {
                    appraiser_company_id = table.Column<long>(type: "bigint", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    license_number = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    appraiser_company_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    address_line_one = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    address_line_two = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    state = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    phone_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    office_contact_first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    office_contact_last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    office_contact_email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    office_contact_phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Lender_list_Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CellNumber = table.Column<string>(type: "character varying", nullable: true),
                    Email_Id = table.Column<string>(type: "character varying", nullable: true),
                    street_Number = table.Column<string>(type: "character varying", nullable: true),
                    street_Name = table.Column<string>(name: "street_Name ", type: "character varying", nullable: true),
                    apartment_Number = table.Column<string>(type: "character varying", nullable: true),
                    profile_image = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("appraiser_company_pkey", x => x.appraiser_company_id);
                });

            migrationBuilder.CreateTable(
                name: "appraisers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    middle_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    company_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    street_number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    street_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    apartment_no = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    area = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    commission_rate = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    max_number_of_assigned_orders = table.Column<int>(type: "integer", nullable: true),
                    designation = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    profile_image = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    company_Id = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true),
                    Lender_list_Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CellNumber = table.Column<string>(type: "character varying", nullable: true),
                    Email_Id = table.Column<string>(type: "character varying", nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("appraisers_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "archived_appraiser",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Orderid = table.Column<long>(type: "bigint", nullable: true),
                    userid = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("archived_appraiser_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "archived_properties",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order_id = table.Column<long>(type: "bigint", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("archived_properties_pkey", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "bid",
                columns: table => new
                {
                    bid_id = table.Column<long>(type: "bigint", nullable: false),
                    order_id = table.Column<long>(type: "bigint", nullable: true),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    appraiser_user_id = table.Column<long>(type: "bigint", nullable: true),
                    request_time = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    response_time = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: true),
                    description = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    bid_amount = table.Column<double>(type: "double precision", nullable: true),
                    bid_lower_range = table.Column<int>(type: "integer", nullable: true),
                    bid_upper_range = table.Column<int>(type: "integer", nullable: true),
                    orderstatus = table.Column<int>(type: "integer", nullable: true),
                    assignedby = table.Column<long>(type: "bigint", nullable: true),
                    remark = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    lender_list_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    modified_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    statusdate = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    appraiser_name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    AppraiserAssign = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("bid_pkey", x => x.bid_id);
                });

            migrationBuilder.CreateTable(
                name: "brokerage",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    middle_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    company_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    license_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    brokerage_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    street_number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    street_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    apartment_no = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    area = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    mortage_brokerage_lic_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    mortage_broker_lic_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    assistant_first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    assistant_email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    profile_image = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    date_established = table.Column<DateOnly>(type: "date", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: true),
                    fax_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    cellnumber = table.Column<string>(type: "character varying", nullable: true),
                    email_id = table.Column<string>(type: "character varying", nullable: true),
                    assistant_two_phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    assistant_two_email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    assistant_last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_two_first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_two_last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("brokerage_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "brokers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    middle_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    company_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    license_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    brokerage_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    street_number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    street_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    apartment_no = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    area = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    mortage_brokerage_lic_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    mortage_broker_lic_no = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    assistant_first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    assistant_email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    profile_image = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    date_established = table.Column<DateOnly>(type: "date", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: true),
                    fax_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: true),
                    brokerageid = table.Column<long>(type: "bigint", nullable: true),
                    cellnumber = table.Column<string>(type: "character varying", nullable: true),
                    email_id = table.Column<string>(type: "character varying", nullable: true),
                    assistant_two_phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    assistant_two_email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    assistant_last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_two_first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    assistant_two_last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("brokers_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contactus",
                columns: table => new
                {
                    contactus_id = table.Column<int>(type: "integer", nullable: false),
                    first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    user_logged_in = table.Column<bool>(type: "boolean", nullable: false),
                    phone_number = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    company = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    state = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    subject = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("contactus_pkey", x => x.contactus_id);
                });

            migrationBuilder.CreateTable(
                name: "notifications",
                columns: table => new
                {
                    notification_id = table.Column<long>(type: "bigint", nullable: false),
                    sender_id = table.Column<long>(type: "bigint", nullable: true),
                    receiver_id = table.Column<long>(type: "bigint", nullable: true),
                    message = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    is_seen = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("notifications_pkey", x => x.notification_id);
                });

            migrationBuilder.CreateTable(
                name: "payment_tokens",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    userid = table.Column<int>(type: "integer", nullable: true),
                    planid = table.Column<int>(type: "integer", nullable: true),
                    token = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    currentdatetime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    topUpId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("payment_tokens_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "plans",
                columns: table => new
                {
                    id = table.Column<short>(type: "smallint", nullable: false),
                    plan_name = table.Column<string>(type: "character(100)", fixedLength: true, maxLength: 100, nullable: false),
                    amount = table.Column<double>(type: "double precision", nullable: false),
                    no_of_properties = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    returnurl = table.Column<string>(type: "text", nullable: false),
                    currencycode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    monthly_amount = table.Column<double>(type: "double precision", nullable: true),
                    discount = table.Column<double>(type: "double precision", nullable: true),
                    yearly_amount = table.Column<double>(type: "double precision", nullable: true),
                    user_type = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("plans_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Productid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Productname = table.Column<string>(type: "text", nullable: true),
                    Productdescription = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Productid);
                });

            migrationBuilder.CreateTable(
                name: "properties",
                columns: table => new
                {
                    property_id = table.Column<int>(type: "integer", nullable: false),
                    street_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    street_number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    city = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    zip_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    area = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    community = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    type_of_building = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    applicant_first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    applicant_last_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    applicant_phone_number = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    applicant_email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    added_datetime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    modified_datetime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    bid_lower_range = table.Column<int>(type: "integer", nullable: true),
                    bid_upper_range = table.Column<int>(type: "integer", nullable: true),
                    urgency = table.Column<short>(type: "smallint", nullable: true),
                    property_status = table.Column<bool>(type: "boolean", nullable: true),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    is_archive = table.Column<bool>(type: "boolean", nullable: true),
                    order_id = table.Column<int>(type: "integer", nullable: true),
                    estimated_value = table.Column<double>(type: "double precision", nullable: true),
                    purpose = table.Column<string>(type: "character varying", nullable: true),
                    type_of_appraisal = table.Column<string>(type: "character varying", nullable: true),
                    lender_information = table.Column<string>(type: "character varying", nullable: true),
                    applicant_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    attachment = table.Column<string>(type: "character varying", nullable: true),
                    sqft = table.Column<int>(type: "integer", nullable: true),
                    image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    remark = table.Column<string>(type: "character varying", nullable: true),
                    is_completed = table.Column<int>(type: "integer", nullable: true),
                    quote_required_date = table.Column<string>(type: "character varying", nullable: true),
                    orderstatus = table.Column<int>(type: "integer", nullable: true),
                    isonhold = table.Column<bool>(type: "boolean", nullable: true),
                    isoncancel = table.Column<bool>(type: "boolean", nullable: true),
                    is_archiveappraiser = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("properties_pkey", x => x.property_id);
                });

            migrationBuilder.CreateTable(
                name: "recurring_product",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("recurring_product_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "recurring_subscriptions",
                columns: table => new
                {
                    subscription_id = table.Column<int>(type: "integer", nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    plan_id = table.Column<int>(type: "integer", nullable: true),
                    total_properties = table.Column<int>(type: "integer", nullable: true),
                    used_properties = table.Column<int>(type: "integer", nullable: true),
                    user_id = table.Column<int>(type: "integer", nullable: true),
                    topUp_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("recurring_subscriptions_pkey", x => x.subscription_id);
                });

            migrationBuilder.CreateTable(
                name: "subscriptionplans",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    frequency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    frequencyinterval = table.Column<int>(type: "integer", nullable: true),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    cycles = table.Column<int>(type: "integer", nullable: true),
                    setupfee = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    cancelurl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    returnurl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("subscriptionplans_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subscriptions",
                columns: table => new
                {
                    subscription_id = table.Column<long>(type: "bigint", nullable: false),
                    start_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    plan_id = table.Column<short>(type: "smallint", nullable: false),
                    total_properties = table.Column<short>(type: "smallint", nullable: false),
                    used_properties = table.Column<short>(type: "smallint", nullable: true),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    topUp_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("subscriptions_pkey", x => x.subscription_id);
                });

            migrationBuilder.CreateTable(
                name: "topup",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    tup_up_amount = table.Column<decimal>(type: "numeric", nullable: true),
                    no_of_properties = table.Column<int>(type: "integer", nullable: true),
                    topupname = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    topup_description = table.Column<string>(type: "text", nullable: true),
                    Currencycode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    returnUrl = table.Column<string>(type: "text", nullable: true),
                    user_type = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("topup_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "transaction_logs",
                columns: table => new
                {
                    transaction_id = table.Column<long>(type: "bigint", nullable: false),
                    transaction_detail = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    paymentid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    created_time = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    plan_amount = table.Column<double>(type: "double precision", nullable: true),
                    plan_name = table.Column<string>(type: "character varying", nullable: true),
                    Is_Active = table.Column<bool>(type: "boolean", nullable: true),
                    start_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    used_properties = table.Column<short>(type: "smallint", nullable: true),
                    no_of_properties = table.Column<short>(type: "smallint", nullable: true),
                    total_properties = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("transaction_logs_pkey", x => x.transaction_id);
                });

            migrationBuilder.CreateTable(
                name: "user_information",
                columns: table => new
                {
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_date_time = table.Column<DateTime>(type: "timestamp(6) without time zone", nullable: false),
                    password_salt = table.Column<byte[]>(type: "bytea", nullable: false),
                    password_hash = table.Column<byte[]>(type: "bytea", nullable: false),
                    user_type = table.Column<short>(type: "smallint", nullable: false),
                    forgot_password_token = table.Column<string>(type: "text", nullable: true),
                    verify_email_token = table.Column<string>(type: "text", nullable: false),
                    resettokenexpiry = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    get_sms = table.Column<int>(type: "integer", nullable: true, defaultValueSql: "1"),
                    get_email = table.Column<int>(type: "integer", nullable: true, defaultValueSql: "1"),
                    isAdmin = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_information_pkey", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "wishlist",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    property_id = table.Column<long>(type: "bigint", nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    added_dateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("wishlist_pkey", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "assign_properties",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    companyid = table.Column<int>(type: "integer", nullable: false),
                    appraiserid = table.Column<int>(type: "integer", nullable: false),
                    propertyid = table.Column<int>(type: "integer", nullable: false),
                    created_DateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("assign_properties_pkey", x => x.id);
                    table.ForeignKey(
                        name: "FK_assign_properties_properties_propertyid",
                        column: x => x.propertyid,
                        principalTable: "properties",
                        principalColumn: "property_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_assign_properties_propertyid",
                table: "assign_properties",
                column: "propertyid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin_archive_property");

            migrationBuilder.DropTable(
                name: "admin_archive_users");

            migrationBuilder.DropTable(
                name: "agreement");

            migrationBuilder.DropTable(
                name: "appraiser_company");

            migrationBuilder.DropTable(
                name: "appraisers");

            migrationBuilder.DropTable(
                name: "archived_appraiser");

            migrationBuilder.DropTable(
                name: "archived_properties");

            migrationBuilder.DropTable(
                name: "assign_properties");

            migrationBuilder.DropTable(
                name: "bid");

            migrationBuilder.DropTable(
                name: "brokerage");

            migrationBuilder.DropTable(
                name: "brokers");

            migrationBuilder.DropTable(
                name: "contactus");

            migrationBuilder.DropTable(
                name: "notifications");

            migrationBuilder.DropTable(
                name: "payment_tokens");

            migrationBuilder.DropTable(
                name: "plans");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "recurring_product");

            migrationBuilder.DropTable(
                name: "recurring_subscriptions");

            migrationBuilder.DropTable(
                name: "subscriptionplans");

            migrationBuilder.DropTable(
                name: "subscriptions");

            migrationBuilder.DropTable(
                name: "topup");

            migrationBuilder.DropTable(
                name: "transaction_logs");

            migrationBuilder.DropTable(
                name: "user_information");

            migrationBuilder.DropTable(
                name: "wishlist");

            migrationBuilder.DropTable(
                name: "properties");
        }
    }
}
