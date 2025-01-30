using System.Net;
using System.Text;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;

namespace CallTech.Class;

public class S3Logger
{
    private readonly string _bucketName;
    private readonly string _keyName;
    private readonly IAmazonS3 _s3Client;

    public S3Logger(string bucketName, string keyName)
    {
        _bucketName = bucketName;
        _keyName = keyName;
        var accessKeyId = "AKIAYS2NR75VZTQQ5O4I";
        var secretAccessKey = "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";

        AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

        var region = RegionEndpoint.USEast1; // For example, US West (Oregon)
        var s3Client = new AmazonS3Client(credentials, region);
        _s3Client = s3Client;
    }

    public async Task Log(string logMessage)
    {
        try
        {
            if (!await DoesLogFileExist()) await CreateLogFile();

            using var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(logMessage));
            await _s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = _keyName,
                InputStream = memoryStream,
                ContentType = "text/plain" // Set content type if applicable
            });
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
            await _s3Client.GetObjectMetadataAsync(_bucketName, _keyName);
            return true;
        }
        catch (AmazonS3Exception ex)
        {
            if (ex.StatusCode == HttpStatusCode.NotFound) return false;
            throw;
        }
    }

    private async Task CreateLogFile()
    {
        await _s3Client.PutObjectAsync(new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = _keyName,
            ContentBody = ""
        });
    }
}