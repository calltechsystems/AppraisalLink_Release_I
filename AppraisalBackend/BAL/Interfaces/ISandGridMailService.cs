using Amazon.Runtime.Internal.Util;
using AppraisalLand.Common.Helpers;
using AppraisalLand.INFRA;
using AppraisalLand.INFRA.Interfaces;

using System;
using System.IO;
using System.Threading.Tasks;

namespace AppraisalLand.BAL
{
    public interface ISandGridMailService
    {
        public void SendEmail();
    }
}