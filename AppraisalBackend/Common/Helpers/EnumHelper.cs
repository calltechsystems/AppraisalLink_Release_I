using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace DAL.Common
{
    public static class EnumHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="enumValue"></param>
        /// <returns></returns>
        public static Int32 ToInt(this Enum enumValue)
        {
            var intv = Enum.ToObject(enumValue.GetType(), enumValue);
            return (int)intv;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="enumValue"></param>
        /// <returns></returns>
        public static short ToShort(this Enum enumValue)
        {
            var intv = Enum.ToObject(enumValue.GetType(), enumValue);
            return (short)(int)intv;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="enumValue"></param>
        /// <returns></returns>
        public static String GetName(this Enum enumValue)
        {
            var intv = Enum.GetName(enumValue.GetType(), enumValue);
            return intv;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        /// <exception cref="NotSupportedException"></exception>
        public static short? ToNullableShort(this object value)
        {
            if (value == null)
            {
                return null;
            }
            else
            {
                if (value is Enum)
                {
                    return (value as Enum).ToShort();
                }
                //else if (value is String) //remove me after US732.9
                //{
                //    return (value as String).ToShort();
                //}
                else
                {
                    throw new NotSupportedException("TResult must be an Enum");
                }
            }
        }

        public static string ToIntString(this Enum enumValue)
        {
            var intv = Enum.ToObject(enumValue.GetType(), enumValue);
            int i = (int)intv;
            return i.ToString();
        }

        /// <summary>
        /// Converts nullable enum to string.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>Enum converted to in then as string</returns>
        public static string ToNullableIntString(this object value)
        {
            if (value == null)
            {
                return null;
            }
            else
            {
                if (value is Enum)
                {
                    return (value as Enum).ToIntString();
                }
                else
                {
                    throw new NotSupportedException("TResult must be an Enum");
                }
            }
        }

        /// <summary>
        /// Converts nullable enum to string.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="nullValue">The value to return iso null.</param>
        /// <returns>Enum converted to in then as string</returns>
        public static string ToNullableIntString(this object value, string nullValue)
        {
            if (value == null)
            {
                return nullValue;
            }
            else
            {
                if (value is Enum)
                {
                    return (value as Enum).ToIntString();
                }
                else
                {
                    throw new NotSupportedException("TResult must be an Enum");
                }
            }
        }

        //public static bool EqualsEnum(this string source, Enum compareTo)
        //{
        //    return true;
        //}

        public static TResult? ConvertToNullableEnum<TResult>(this string source) where TResult : struct
        {
            if (!typeof(TResult).IsEnum)
            {
                throw new NotSupportedException("TResult must be an Enum");
            }

            if (string.IsNullOrEmpty(source))
            {
                return null;
            }

            return (TResult)Enum.Parse(typeof(TResult), source);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        /// <exception cref="NotSupportedException"></exception>
        public static TResult? ConvertToNullableEnum<TResult>(this Int16? source) where TResult : struct
        {
            if (!typeof(TResult).IsEnum)
            {
                throw new NotSupportedException("TResult must be an Enum");
            }

            if (source.HasValue)
            {
                return (TResult)Enum.Parse(typeof(TResult), source.Value.ToString());
            }
            else
            {
                return null;
            }
        }

        //public static TResult? ConvertDropdownValueToEnum<TResult>(this string source) where TResult : struct
        //{
        //    if (!typeof(TResult).IsEnum)
        //    {
        //        throw new NotSupportedException("TResult must be an Enum");
        //    }

        //    if (string.IsNullOrEmpty(source) || source.Trim().CIEquals("-1"))
        //    {
        //        return null;
        //    }

        //    return (TResult)Enum.Parse(typeof(TResult), source);
        //}

        public static TResult ConvertToEnum<TResult>(this String source)
        {
            if (!typeof(TResult).IsEnum)
            {
                throw new NotSupportedException("TResult must be an Enum");
            }


            return (TResult)Enum.Parse(typeof(TResult), source);
        }

        public static TResult ConvertToEnum<TResult>(this Int16 source)
        {
            if (!typeof(TResult).IsEnum)
            {
                throw new NotSupportedException("TResult must be an Enum");
            }

            var result = Enum.ToObject(typeof(TResult), source);
            return (TResult)result;
        }

        public static TResult ConvertToEnum<TResult>(this Int32 source)
        {
            if (!typeof(TResult).IsEnum)
            {
                throw new NotSupportedException("TResult must be an Enum");
            }

            var result = Enum.ToObject(typeof(TResult), source);
            return (TResult)result;
        }

        public static IDictionary<String, Int32> ConvertEnumToDictionary<E>()
        {
            if (typeof(E).BaseType != typeof(Enum))
            {
                throw new InvalidCastException();
            }

            return Enum.GetValues(typeof(E)).Cast<Int32>().ToDictionary(currentItem => Enum.GetName(typeof(E), currentItem));
        }

        //public static SerializableDictionary<short, String> ConvertEnumToSerializableDictionary<E>()
        //{
        //    var dictionary = ConvertEnumToDictionary<E>();
        //    var serializableDictionary = new SerializableDictionary<short, String>();
        //    foreach (var item in dictionary)
        //    {
        //        serializableDictionary.Add((short)item.Value, item.Key);

        //    }
        //    return serializableDictionary;
        //}


        /// <summary>
        /// Retrieve the description on the enum, e.g.
        /// [Description("Bright Pink")]
        /// BrightPink = 2,
        /// Then when you pass in the enum, it will retrieve the description
        /// </summary>
        /// <param name="en">The Enumeration</param>
        /// <returns>A string representing the friendly name</returns>
        public static string GetDescription(this Enum en)
        {
            Type type = en.GetType();

            MemberInfo[] memInfo = type.GetMember(en.ToString());

            if (memInfo != null && memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attrs != null && attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return en.ToString();
        }
    }
}
