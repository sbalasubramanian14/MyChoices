using System;
using System.Collections.Generic;
using System.Linq;

namespace WhitePage.Utilities.Extensions
{
    public static class StringExtensions
    {
        public static int[] ToIntArray(this string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return new List<int>().ToArray();
            else
                return input.Split(';').Select(n => Convert.ToInt32(n)).ToArray();
        }

        public static string ToArrayString(this int[] input)
        {
            if (input==null)
                return null;
            else
                return string.Join(";", Array.ConvertAll(input, x => x.ToString()));
        }
    }
}
