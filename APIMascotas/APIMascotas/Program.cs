using APIMascotas.Models;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors

builder.Services.AddCors(options=> options.AddPolicy("AllowWepapp",
                           builder => builder.AllowAnyOrigin()
                          .AllowAnyHeader().AllowAnyMethod()));


//add context DB
builder.Services.AddDbContext<AplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("conexion"));
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// conf Cors APP

app.UseCors("AllowWepapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
