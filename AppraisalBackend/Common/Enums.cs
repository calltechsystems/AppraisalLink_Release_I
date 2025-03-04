using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppraisalLand.Common.Enums
{
    /// <summary>
    /// 
    /// </summary>
    public enum UserType
    {
        MortgageBroker = 1,
        MortgageBrokerage = 2,
        Appraiser = 3,
        AppraiserCompany = 4,
        SubAppraiser = 5,
        SubBroker = 6,
        Admin = 7
    }

    /// <summary>
    /// 
    /// </summary>
    public enum StorageProviderType
    {
        AWS,
        Azure,
        Local
    }

    /// <summary>
    /// Used for Email/Sms Notification 
    /// </summary>
    public enum MessageCode
    {
        NewUserRegistration = 100,
        ResetPassword = 101,
        SubscriptionActivation = 102,
        UpgradeYourSubscription = 103,
        SubscriptionCancellation = 104,
        TopUpPlanPurchased = 105,
        ThankYouforContactingUs = 106,
        ProfileUpdate = 107,
        NewPropertySubmission = 201,
        PropertyQuoteHold = 202,
        CancelProperty = 203,
        QuoteApproved = 204,
        ChangeAppraiser = 205
    }


    /// <summary>
    /// 
    /// </summary>
    public enum OrderStatus
    {
        New,
        QuoteProvided,
        Accepted,
        Completed,
        Cancel,
        Hold
    }

    /// <summary>
    /// 
    /// </summary>
    public enum AppraisalStatus
    {
        AppraiserAssigned = 1,
        ApplicantContactedbyAppraiser = 2,
        AppraisalVisitConfirmed = 3,
        AppraisalReportWritinginProgress = 4,
        AssignmentonHold = 5,
        AssignmentCancelled = 6,
        AppraisalVisitCompleted = 7
    }

    /// <summary>
    /// 
    /// </summary>
    public enum PropertyPurpose
    {
        AssetValuation = 1,
        Capitalgain = 2,
        Matrimonial = 3,
        Other = 4,
        Purchase = 5,
        Refinance = 6
    }

    /// <summary>
    /// 
    /// </summary>
    public enum PropertyType
    {
        CondoApartment = 1,
        Commercial = 2,
        CondoTownhouse = 3,
        Detached = 4,
        SemiDetached = 5,
        FreeholdTownhouse = 6,
        Industrial = 7,
        Others = 8
    }

    /// <summary>
    /// 
    /// </summary>
    public enum AppraisalsType
    {
        Desktop = 1,
        Driveby = 2,
        FullAppraisal = 3,
        DesktopwithMarketRent = 4,
        DrivebywithMarketRent = 5,
        FullAppraisalWithMarketRent = 6,
        Other = 7
    }

    /// <summary>
    /// 
    /// </summary>
    public enum PaypalSubscriptionStatus
    {
        Active,
        Cancel,
        Suspend
    }
}