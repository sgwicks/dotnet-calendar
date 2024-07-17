using CalendarDataAccess.DataAccess;
using CalendarDataAccess.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// USERS ENDPOINTS
UsersDataAccess usersCollection = new();

app.MapGet("/users", usersCollection.GetAllUsers)
.WithName("GetAllUsers")
.WithOpenApi();

app.MapPost("/users", usersCollection.CreateUser)
.WithName("CreateUser")
.WithOpenApi();

app.Run();