using CalendarDataAccess.DataAccess;
using CalendarDataAccess.Models;
using Microsoft.AspNetCore.Mvc;

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

app.MapGet("/users/{id}", usersCollection.GetUserById)
.WithName("GetUserByUsername")
.WithOpenApi();

app.MapPost("/users", usersCollection.CreateUser)
.WithName("CreateUser")
.WithOpenApi();

app.MapPatch("/users", usersCollection.UpdateUser)
.WithName("UpdateUser")
.WithOpenApi();

app.MapDelete("/users", async ([FromBody] UserModel user) => {
    await usersCollection.DeleteUser(user);
    return Results.NoContent();
})
.WithName("DeleteUser")
.WithOpenApi();

app.Run();