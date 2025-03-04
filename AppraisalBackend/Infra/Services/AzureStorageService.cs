using AppraisalLand.Common;
using AppraisalLand.INFRA.Interfaces;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Threading.Tasks;

namespace AppraisalLand.INFRA
{
    public class AzureStorageService : IStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public AzureStorageService(IConfiguration configuration)
        {
            _blobServiceClient = new BlobServiceClient(configuration["Storage:Azure:ConnectionString"]);
            _containerName = configuration["Storage:Azure:ContainerName"];
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

            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);

            await blobClient.UploadAsync(fileStream, overwrite: true);

            return blobClient.Uri.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public async Task<Stream> DownloadFileAsync(string fileName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);

            var response = await blobClient.DownloadAsync();
            return response.Value.Content;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public async Task<bool> DeleteFileAsync(string fileName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);

            await blobClient.DeleteIfExistsAsync();
            return true;
        }
    }
}
