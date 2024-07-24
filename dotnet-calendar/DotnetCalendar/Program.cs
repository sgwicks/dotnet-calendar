using CalendarDataAccess.DataAccess;
using CalendarDataAccess.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

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
.WithName("GetUserById")
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

EventsDataAccess eventsCollection = new();

app.MapGet("/events", eventsCollection.GetAllEvents)
.WithName("GetAllEvents")
.WithOpenApi();

app.MapGet("/events/{id}", eventsCollection.GetEventById)
.WithName("GetEventById")
.WithOpenApi();

app.MapPost("/events", eventsCollection.CreateEvent)
.WithName("CreateEvent")
.WithOpenApi();

app.MapPatch("/events", eventsCollection.UpdateEvent)
.WithName("UpdateEvent")
.WithOpenApi();

app.MapDelete("/events", async ([FromBody] EventModel user) => {
    await eventsCollection.DeleteEvent(user);
    return Results.NoContent();
})
.WithName("DeleteEvent")
.WithOpenApi();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

app.Run();