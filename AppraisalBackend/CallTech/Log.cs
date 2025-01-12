namespace CallTech
{
    public class Log
    {

        public void writeLog(string strValue)
        {
            try
            {
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

            }
        }
        private static void LogWrite(string logMessage, StreamWriter w)
        {
            w.WriteLine("{0}", logMessage);
            w.WriteLine("----------------------------------------");
        }

        static string FindConfigurationValue(IEnumerable<IConfigurationProvider> providers, string key)
        {
            foreach (var provider in providers)
            {
                if (provider.TryGet(key, out string value))
                {
                    return value;
                }
            }
            return null;
        }
    }
}
