using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AppraisalLand.Common.Helpers
{
    public sealed class CryptoHelper
    {
        // Fields
        private static byte[] IVDescription = new byte[] { 0x37, 0x67, 0xf6, 0x4f, 0x24, 0x63, 0xa7, 3 };
        private static byte[] KEYDescription = new byte[] { 0x2a, 0x10, 0x5d, 0x9c, 0x4e, 4, 0xda, 0x20 };

        private static byte[] IV_3DES = new byte[] {
                        0x37, 0x67, 0xf6, 0x4f, 0x24, 0x63, 0xa7, 3, 0x2a, 5, 0x3e, 0x53, 0xb8, 7, 0xd1, 13,
                        0x91, 0x17, 200, 0x3a, 0xad, 10, 0x79, 0xde
                };
        private static byte[] KEY_3DES = new byte[] {
                        0x2a, 0x10, 0x5d, 0x9c, 0x4e, 4, 0xda, 0x20, 15, 0xa7, 0x2c, 80, 0x1a, 250, 0x9b, 0x70,
                        2, 0x5e, 11, 0xcc, 0x77, 0x23, 0xb8, 0xc5
                 };

        // Methods
        private CryptoHelper()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plaintext"></param>
        /// <returns></returns>
        public static string ComputeHSA256Hass(string plaintext)
        {
            using var sha256 = SHA256.Create();
            var ytes = Encoding.UTF8.GetBytes(plaintext);
            var hash = sha256.ComputeHash(ytes);
            return Convert.ToBase64String(hash);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static byte[] EncryptAES(byte[] data)
        {
            using var aes = Aes.Create();
            aes.Key = KEYDescription;
            aes.IV = IVDescription;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            using var encryptor = aes.CreateEncryptor();

            return encryptor.TransformFinalBlock(data, 0, data.Length);
        }


        //public static string DecryptDES(string encryptedText)
        //{
        //    if (!string.IsNullOrEmpty(encryptedText))
        //    {
        //        DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(encryptedText));
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(KEYDescription, IVDescription), CryptoStreamMode.Read);
        //        StreamReader streamReader = new StreamReader(cryptoStream);

        //        return streamReader.ReadToEnd();
        //    }
        //    return string.Empty;
        //}

        //public static string DecryptTripleDES(string encryptedText)
        //{
        //    if (!string.IsNullOrEmpty(encryptedText))
        //    {
        //        TripleDESCryptoServiceProvider cryptoProvider = new TripleDESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(encryptedText));
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(KEY_3DES, IV_3DES), CryptoStreamMode.Read);
        //        StreamReader streamReader = new StreamReader(cryptoStream);
        //        return streamReader.ReadToEnd();
        //    }
        //    return string.Empty;
        //}

        //public static string EncryptDES(string plaintext)
        //{
        //    if (!string.IsNullOrEmpty(plaintext))
        //    {
        //        DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream();
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(KEYDescription, IVDescription), CryptoStreamMode.Write);
        //        StreamWriter streamWriter = new StreamWriter(cryptoStream);
        //        streamWriter.Write(plaintext);
        //        streamWriter.Flush();
        //        cryptoStream.FlushFinalBlock();
        //        memoryStream.Flush();
        //        return Convert.ToBase64String(memoryStream.GetBuffer(), 0, Convert.ToInt32(memoryStream.Length));
        //    }
        //    return string.Empty;
        //}

        //public static string EncryptTripleDES(string plaintext)
        //{
        //    if (!string.IsNullOrEmpty(plaintext))
        //    {
        //        TripleDESCryptoServiceProvider cryptoProvider = new TripleDESCryptoServiceProvider();
        //        MemoryStream memoryStream = new MemoryStream();
        //        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(KEY_3DES, IV_3DES), CryptoStreamMode.Write);
        //        StreamWriter streamWriter = new StreamWriter(cryptoStream);
        //        streamWriter.Write(plaintext);
        //        streamWriter.Flush();
        //        cryptoStream.FlushFinalBlock();
        //        memoryStream.Flush();
        //        return Convert.ToBase64String(memoryStream.GetBuffer(), 0, Convert.ToInt32(memoryStream.Length));
        //    }
        //    return string.Empty;
        //}
    }
}