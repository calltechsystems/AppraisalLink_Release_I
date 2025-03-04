using System.IO;
using System.Threading.Tasks;

namespace AppraisalLand.INFRA.Interfaces
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(Stream fileStream, string fileName);
        Task<Stream> DownloadFileAsync(string fileKey);
        Task<bool> DeleteFileAsync(string fileKey);
    }
}
