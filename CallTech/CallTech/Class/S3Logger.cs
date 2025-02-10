using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
namespace CallTech.Class
{
    public class S3Logger
    {
        private readonly string bucketName;
        private readonly string keyName;
        private readonly IAmazonS3 s3Client;

        public S3Logger(string bucketName, string keyName)
        {
            this.bucketName = bucketName;
            this.keyName = keyName;
            string accessKeyId = "AKIAYS2NR75VZTQQ5O4I";
            string secretAccessKey = "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";

            AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

            RegionEndpoint region = RegionEndpoint.USEast1; // For example, US West (Oregon)
            AmazonS3Client _s3Client = new AmazonS3Client(credentials, region);
            this.s3Client = _s3Client;
        }
        public async Task Log(string logMessage)
        {
            try
            {
                if (!await DoesLogFileExist())
                {
                    await CreateLogFile();
                }

                using (MemoryStream memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(logMessage)))
                {
                    await s3Client.PutObjectAsync(new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = keyName,
                        InputStream = memoryStream,
                        ContentType = "text/plain" // Set content type if applicable
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error logging to S3: {ex.Message}");
            }
        }

        private async Task<bool> DoesLogFileExist()
        {
            try
            {
                await s3Client.GetObjectMetadataAsync(bucketName, keyName);
                return true;
            }
            catch (AmazonS3Exception ex)
            {
                if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return false;
                }
                throw;
            }
        }

        private async Task CreateLogFile()
        {
            await s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = bucketName,
                Key = keyName,
                ContentBody = ""
            });
        }
    }
}
