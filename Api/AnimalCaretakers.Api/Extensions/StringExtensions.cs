﻿namespace AnimalCaretakers.Api.Extensions;

public static class StringExtensions
{
    public static bool HasValue(this string val)
    {
        return !string.IsNullOrEmpty(val);
    }
}
