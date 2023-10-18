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

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TokenModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<IResult> Login([FromBody] LoginFormModel form)
    {
        var result = await _authService.Login(form);

        return result.Match(p => Results.Ok(p), p => Results.BadRequest(p.Value));
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    public async Task<IResult> Register([FromBody] RegisterFormModel form)
    {
        var result = await _authService.Register(form);

        return result.Match(p => Results.Accepted(), p => Results.BadRequest(p.Value));
    }
}