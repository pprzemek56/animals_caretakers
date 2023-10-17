using AnimalCaretakers.Data;
using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options =>
                            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddFluentMigratorCore()
                .ConfigureRunner(o => o.AddSqlServer()
                                       .WithGlobalConnectionString(builder.Configuration.GetConnectionString("DefaultConnection"))
                                       .ScanIn(typeof(DataContext).Assembly).For.Migrations());

var app = builder.Build();

using (var services = app.Services.CreateScope())
{
    services.ServiceProvider.GetRequiredService<IMigrationRunner>().MigrateUp();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
