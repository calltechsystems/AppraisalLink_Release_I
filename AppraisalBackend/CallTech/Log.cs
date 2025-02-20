using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;

namespace AppraisalLand
{
    /// <summary>
    /// 
    /// </summary>
    public class Log
    {
        private static readonly string BucketName = "appraisalfile";
        private static readonly string LogFolder = "logs";

        private static readonly AmazonS3Client s3Client = new AmazonS3Client(RegionEndpoint.USEast1);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strValue"></param>
        public void WriteLog(string strValue)
        {
            try
            {
                WriteLogAndUploadToS3(strValue);
                var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();

                var logFilePath = FindConfigurationValue(configuration.Providers, "Logging:FilePath");

                //Logfile
                string path = logFilePath;
                StreamWriter sw;
                if (!File.Exists(path))
                { sw = File.CreateText(path); }
                else
                { sw = File.AppendText(path); }

                LogWrite(strValue, sw);

                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: Logs->writeLog Method: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="w"></param>
        private static void LogWrite(string logMessage, StreamWriter w)
        {
            w.WriteLine("{0}", logMessage);
            w.WriteLine("----------------------------------------");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="providers"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        static string? FindConfigurationValue(IEnumerable<IConfigurationProvider> providers, string key)
        {
            foreach (var provider in providers)
            {
                if (provider.TryGet(key, out string? value))
                {
                    return value;
                }
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logFilePath"></param>
        /// <returns></returns>
        private async Task<bool> UploadLogToS3(string logFilePath)
        {

            string accessKeyId = "AKIAYS2NR75VZTQQ5O4I";
            string secretAccessKey = "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";

            AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

            RegionEndpoint region = RegionEndpoint.USEast1; // For example, US West (Oregon)
            AmazonS3Client s3Client = new AmazonS3Client(credentials, region);

            string s3Key = $"{LogFolder}/{Path.GetFileName(logFilePath)}";

            try
            {
                using (var stream = new FileStream(logFilePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    var request = new PutObjectRequest
                    {
                        BucketName = BucketName,
                        Key = s3Key,
                        InputStream = stream,
                        ContentType = "text/plain"
                    };

                    PutObjectResponse response = await s3Client.PutObjectAsync(request);

                    if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                    {
                        Console.WriteLine($"ApprisalLandAppError: Logs->UploadLogToS3 Method:Upload successful {s3Key}");
                        return true;
                    }
                    else
                    {
                        Console.WriteLine($"ApprisalLandAppError: Logs->UploadLogToS3 Method:Upload failed with status code {response.HttpStatusCode}");
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: Logs->UploadLogToS3 Method: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task WriteLogAndUploadToS3(string message)
        {
            string logsDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, LogFolder);
            Directory.CreateDirectory(logsDir); // Ensure the directory exists

            TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");

            DateTime easternTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, easternZone);
            string safeTime = easternTime.ToString("yyyyMMdd_HHmmss");
            string logFilePath = Path.Combine(logsDir, $"log_{safeTime}.txt");

            try
            {
                // Write log entry
                await File.AppendAllTextAsync(logFilePath, $"{easternTime}: {message}{Environment.NewLine}");

                // Upload log file to S3
                bool isUploaded = await UploadLogToS3(logFilePath);

                if (isUploaded)
                {
                    Console.WriteLine($"ApprisalLandAppError: Logs->WriteLogAndUploadToS3 Method: Log file uploaded successfully.");
                }
                else
                {
                    Console.WriteLine($"ApprisalLandAppError: Logs->WriteLogAndUploadToS3 Method: Log file upload failed.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: Logs->WriteLogAndUploadToS3 Method: {ex.Message}");
            }
        }
    }
}