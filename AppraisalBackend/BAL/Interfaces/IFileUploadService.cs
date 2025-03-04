namespace AppraisalLand.BAL.Interfaces
{
    public interface IFileUploadService
    {
        public Task<string> UploadUserProfileAsync(Stream fileStream, string fileName, Guid userId);
        public Task<string> UploadPropertyDocumentAsync(Stream fileStream, string fileName, Guid propertyId);
    }
}
