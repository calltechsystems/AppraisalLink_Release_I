using Amazon.S3;
using AppraisalLand.BAL.Interfaces;
using AppraisalLand.BAL.Services;
using AppraisalLand.Class;
using AppraisalLand.Common.Helpers;
using AppraisalLand.INFRA;
using AppraisalLand.INFRA.Interfaces;
using BAL.Services;
using DAL.Repository;
using DBL.Backend;
using DBL.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
//builder.WebHost.UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:44370");
// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

builder.Services.AddAWSService<IAmazonS3>();

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json") // Use appsettings.app.json
            .Build();
builder.Services.AddSingleton(configuration);
builder.Services.AddSingleton<FileValidationHelper>();

builder.Services.AddHttpClient();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
builder.Services.AddDbContext<AppraisallandsContext>();
builder.Services.AddTransient<IRegistrationService, RegistrationService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IEmailService, SmtpEmailService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPlans, PlansService>();
builder.Services.AddScoped<IBroker, BrokerService>();
builder.Services.AddScoped<IBrokerage, BrokerageService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
builder.Services.AddScoped<IAppraiserIndividual, AppraiserIndividualService>();
builder.Services.AddScoped<IAppraiserCompany, AppraiserCompanyService>();
builder.Services.AddScoped<IWishlistService, WishlistService>();
builder.Services.AddScoped<Ibid, BidRepositoryService>();
builder.Services.AddScoped<IContactusRepository, ContactusRepository>();
builder.Services.AddScoped<IAdmin, AdminService>();
builder.Services.AddScoped<IEmailSmsNotification, EmailSmsNotificationService>();
builder.Services.Configure<EncryptionSettings>(builder.Configuration.GetSection("EncryptionSettings"));
builder.Services.AddScoped<EncryptionHelper>();
builder.Services.AddScoped<NotificationHelper>();
//builder.Services.AddScoped<IServicesMiddlewareTopUp, ServicesMiddlewareTopUp>();
builder.Services.AddScoped<ITwilioSms>(provider =>
    new TwilioSmsService(
        configuration["Twilio:AccountSid"],
        configuration["Twilio:AuthToken"],
        configuration["Twilio:PhoneNumber"]
    )
);

var appSettingsSection = configuration.GetSection("ApplicationSettings");
builder.Services.Configure<ApplicationSettings>(appSettingsSection);

var storageProvider = builder.Configuration["Storage:Provider"];
if (storageProvider == "AWS")
{
    builder.Services.AddSingleton<IStorageService, S3StorageService>();
}
else if (storageProvider == "Azure")
{
    builder.Services.AddSingleton<IStorageService, AzureStorageService>();
}

// Register Services
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
builder.Services.AddScoped<IStorageService, S3StorageService>(); // or AzureStorageService

var appSettings = appSettingsSection.Get<ApplicationSettings>();
builder.Services.AddMvc(options => options.EnableEndpointRouting = false);
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IServicesMiddleware>(serviceProvider => new ServicesMiddleware(appSettings));
builder.Services.AddTransient<IServicesMiddlewareTopUp>(serviceProvider => new ServicesMiddlewareTopUp(appSettings));
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();

// Set Serilog as the logger factory for ASP.NET Core
builder.Logging.AddSerilog();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Jwt:Audience", policy =>
        policy.RequireAuthenticatedUser()
              .RequireRole("admin") // Optional: Specify required role(s)
    );
});
builder.Services.AddCors(P => P.AddPolicy("CORSPOLICY", build =>
{
    build.WithOrigins("http://localhost:3008").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPOLICY", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AppraisaLand", Version = "v1.0" });

    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "Using the Authorization header with the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    c.AddSecurityDefinition("Bearer", securitySchema);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            { securitySchema, new[] { "Bearer" } }
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();

//}
app.UseCors("CORSPOLICY");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();