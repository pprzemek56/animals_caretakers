using AnimalCaretakers.Api.Models.Auth;
using AnimalCaretakers.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimalCaretakers.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Finds user with given credentials and generates auth jwt bearer token
    /// </summary>
    /// <param name="form">form with login and password</param>
    /// <returns>JWT bearer token or bad request in case of error</returns>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TokenModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<IResult> Login([FromBody] LoginFormModel form)
    {
        var result = await _authService.Login(form);

        return result.Match(p => Results.Ok(p), p => Results.BadRequest(p.Value));
    }

    /// <summary>
    /// Creates new user with given data in form
    /// </summary>
    /// <param name="form">Infos about new user</param>
    /// <returns>Accepted or bad request in case of error</returns>
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<IResult> Register([FromBody] RegisterFormModel form)
    {
        var result = await _authService.Register(form);

        return result.Match(p => Results.Accepted(), p => Results.BadRequest(p.Value));
    }
}