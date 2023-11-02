using AnimalCaretakers.Data.Enums;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AnimalCaretakers.Api.Extensions;

public static class AuthExtensions
{
    public static bool HasRole(this ClaimsPrincipal user, UserType userType)
    {
        return user.HasClaim(ClaimTypes.Role, userType.ToString());
    }

    public static long Id(this ClaimsPrincipal user)
    {
        return long.Parse(user.FindFirst(ClaimTypes.NameIdentifier).Value);
    }
}

public class AuthorizeUserTypeAttribute : AuthorizeAttribute
{
    public AuthorizeUserTypeAttribute(params UserType[] types) : base()
    {
        Roles = string.Join(",", types);
    }
}