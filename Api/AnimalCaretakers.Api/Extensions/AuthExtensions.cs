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
}

public class AuthorizeUserTypeAttribute : AuthorizeAttribute
{
    public AuthorizeUserTypeAttribute(params UserType[] types) : base()
    {
        Roles = string.Join(",", types);
    }
}