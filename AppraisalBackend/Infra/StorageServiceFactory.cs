using AppraisalLand.INFRA.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AppraisalLand.INFRA
{
    public interface IStorageServiceFactory
    {
        IStorageService CreateStorageService();
    }

    public class StorageServiceFactory : IStorageServiceFactory
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <param name="configuration"></param>
        public StorageServiceFactory(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        public IStorageService CreateStorageService()
        {
            var storageType = _configuration["Storage:Provider"];

            return storageType?.ToLower() switch
            {
                "aws" => _serviceProvider.GetRequiredService<S3StorageService>(),
                "azure" => _serviceProvider.GetRequiredService<AzureStorageService>(),
                _ => throw new InvalidOperationException("Invalid storage provider configured.")
            };
        }
    }
}
