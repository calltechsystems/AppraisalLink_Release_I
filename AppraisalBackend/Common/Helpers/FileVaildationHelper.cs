using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Configuration.Binder;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;

namespace AppraisalLand.Common.Helpers
{
    public class FileValidationHelper
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public FileValidationHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="fileSize"></param>
        /// <returns></returns>
        public bool ValidateUserProfile(string fileName, long fileSize)
        {
            var allowedExtensions = _configuration.GetSection("FileUploadSettings:AllowedProfileExtensions").Get<List<string>>() ?? new List<string>();
            
            var maxSize = _configuration.GetValue<long>("FileUploadSettings:MaxProfileSize");
            if (maxSize != null)
            {
                string extension = Path.GetExtension(fileName).ToLower();

                return allowedExtensions.Contains(extension) && fileSize <= maxSize;
            }

            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="fileStream"></param>
        /// <returns></returns>
        public bool ValidatePropertyDocument(string fileName, Stream fileStream)
        {
            var allowedExtensions = _configuration.GetSection("FileUploadSettings:AllowedPropertyExtensions").Get<string[]>();

            var allowedZipContents = _configuration.GetSection("FileUploadSettings:AllowedZipContents").Get<string[]>();

            var maxSize = _configuration.GetValue<long>("FileUploadSettings:MaxPropertySize");

            if (!allowedExtensions.Contains(Path.GetExtension(fileName).ToLower()) || fileStream.Length > maxSize)
            {
                return false;
            }

            using var archive = new ZipArchive(fileStream, ZipArchiveMode.Read, true);

            return archive.Entries.All(entry => allowedZipContents.Contains(Path.GetExtension(entry.Name).ToLower()));
        }
    }
}