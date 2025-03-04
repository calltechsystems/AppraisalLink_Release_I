using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using AppraisalLand.Common;
using AppraisalLand.INFRA.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace AppraisalLand.INFRA
{
    public class S3StorageService : IStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public S3StorageService(IConfiguration configuration)
        {
            _bucketName = configuration["Storage:AWS:BucketName"];
            _s3Client = new AmazonS3Client(
                configuration["Storage:AWS:AccessKey"],
                configuration["Storage:AWS:SecretKey"],
                RegionEndpoint.GetBySystemName(configuration["Storage:AWS:Region"])
            );
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            // Verify the File Size 
            if (fileStream.Length > AppConstants.MaxUploadSizeMB * 1024 * 1024)
            {
                throw new Exception($"File Size exceeds the limit of {AppConstants.MaxUploadSizeMB} MB.");
            }

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = fileStream,
                Key = fileName,
                BucketName = _bucketName,
                ContentType = "application/octet-stream",
                CannedACL = S3CannedACL.Private
            };

            using var transferUtility = new TransferUtility(_s3Client);
            await transferUtility.UploadAsync(uploadRequest);

            return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public async Task<Stream> DownloadFileAsync(string fileName)
        {
            var request = new GetObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            var response = await _s3Client.GetObjectAsync(request);
            return response.ResponseStream;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public async Task<bool> DeleteFileAsync(string fileName)
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            await _s3Client.DeleteObjectAsync(request);
            return true;
        }
    }
}
