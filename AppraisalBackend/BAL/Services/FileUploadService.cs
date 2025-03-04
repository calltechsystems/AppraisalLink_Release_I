using Amazon.Runtime.Internal.Util;
using AppraisalLand.BAL.Interfaces;
using AppraisalLand.Common.Helpers;
using AppraisalLand.INFRA;
using AppraisalLand.INFRA.Interfaces;

using System;
using System.IO;
using System.Threading.Tasks;

namespace AppraisalLand.BAL.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IStorageService _storageService;
        private readonly FileValidationHelper _fileValidationHelper;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="storageService"></param>
        /// <param name="fileValidationHelper"></param>
        public FileUploadService(IStorageService storageService, FileValidationHelper fileValidationHelper)
        {
            _storageService = storageService;
            _fileValidationHelper = fileValidationHelper;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="fileName"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<string> UploadUserProfileAsync(Stream fileStream, string fileName, Guid userId)
        {
            if (_fileValidationHelper.ValidateUserProfile(fileName, fileStream.Length))
            {
                throw new Exception("Invalid profile image format or size.");
            }
            string filePath = $"users/{userId}/{fileName}";

            return await _storageService.UploadFileAsync(fileStream, filePath);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="fileName"></param>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<string> UploadPropertyDocumentAsync(Stream fileStream, string fileName, Guid propertyId)
        {
            if (_fileValidationHelper.ValidatePropertyDocument(fileName, fileStream))
            {
                throw new Exception("Invalid property document format or content.");
            }

            // Encrypt the ZIP file before upload       
            byte[] encryptedData = CryptoHelper.EncryptAES(await ReadStreamAsync(fileStream));        
            using var encryptedStream = new MemoryStream(encryptedData);
            string filePath = $"properties/{propertyId}/{fileName}";

            return await _storageService.UploadFileAsync(encryptedStream, filePath);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        private async Task<byte[]> ReadStreamAsync(Stream stream)
        {
            using var memoryStream = new MemoryStream();
            await stream.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}