using AnimalCaretakers.Api.Models.Auth;
using AnimalCaretakers.Data;
using AnimalCaretakers.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OneOf;
using OneOf.Types;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnimalCaretakers.Api.Services;

public class AuthService
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<OneOf<TokenModel, Error<string>>> Login(LoginFormModel form)
    {
        var user = await _context.Users.SingleOrDefaultAsync(p => p.Username == form.Username);

        if (user is null || !VerifyHashedPassword(user.Password, form.Password))
            return new Error<string>("Nieprawidłowy login lub hasło");

        return new TokenModel
        {
            Token = GenerateToken(user)
        };
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, 12);
    }

    private bool VerifyHashedPassword(string hashedPassword, string providedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
    }

    private string GenerateToken(User user)
    {
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                    new Claim(JwtRegisteredClaimNames.Email, user.Username),
                    new Claim(ClaimTypes.Role, user.UserTypeEnum.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString())
                }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<OneOf<Success, Error<string>>> Register(RegisterFormModel form)
    {
        if (await _context.Users.AnyAsync(p => p.Username == form.Username))
        {
            return new Error<string>("Użytkownik o podanej nazwie już istnieje");
        }

        // todo: use mapper
        var user = new User
        {
            GivenName = form.GivenName,
            Password = HashPassword(form.Password),
            Surname = form.Surname,
            Username = form.Username,
            UserTypeEnum = form.UserType
        };

        _context.Add(user);

        await _context.SaveChangesAsync();

        return new Success();
    }
}
