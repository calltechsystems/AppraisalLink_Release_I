using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using CallTech.Class;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly S3Logger s3Logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="s3Client"></param>
        public FileUploadController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
            s3Logger = new S3Logger("appraisalfile", "logs/mylog.txt");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="File"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile File)
        {
            try
            {
                string accessKeyId = "AKIAYS2NR75VZTQQ5O4I";
                string secretAccessKey = "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";

                AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

                RegionEndpoint region = RegionEndpoint.USEast1; // For example, US West (Oregon)
                AmazonS3Client s3Client = new AmazonS3Client(credentials, region);

                if (File == null || File.Length == 0)
                {
                    return BadRequest("No file uploaded");
                }

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(File.FileName);

                using (var stream = File.OpenReadStream())
                {
                    var request = new PutObjectRequest
                    {
                        BucketName = "appraisalfile",
                        Key = fileName,
                        InputStream = stream,
                        ContentType = File.ContentType
                    };

                    await s3Client.PutObjectAsync(request);
                }

                return Ok($"File uploaded successfully: {fileName}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error uploading file: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("fileupload")]
        public async Task<IActionResult> UploadFileAsync(IFormFile file)
        {
            try
            {
                await s3Logger.Log("Start Uploadfile function");
                string accessKeyId = "AKIAYS2NR75VZTQQ5O4I";
                string secretAccessKey = "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";

                AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

                RegionEndpoint region = RegionEndpoint.USEast1; // For example, US West (Oregon)
                AmazonS3Client s3Client = new AmazonS3Client(credentials, region);
                string? prefix = "";
                string bucketName = "appraisalfile";
                var key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}";
                var request = new PutObjectRequest()
                {
                    BucketName = bucketName,
                    Key = key,
                    InputStream = file.OpenReadStream()
                };
                request.Metadata.Add("Content-Type", file.ContentType);
                await s3Client.PutObjectAsync(request);
                var s3Url = $"https://{bucketName}.s3.amazonaws.com/{key}";

                return Ok($"File uploaded to S3 successfully! Access it at: {s3Url}");
            }
            catch (Exception ex)
            {
                await s3Logger.Log("Error Uploadfile function...." + ex);
                throw;
            }
        }
    }
}