using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Driver;
using CalendarDataAccess;

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

string connectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING") ?? "mongodb://mongo:27017";
string databaseName  ="calendar_db";
string collectionName = "calendar";

var client = new MongoClient(connectionString);
var db = client.GetDatabase(databaseName);
var collection = db.GetCollection<UserModel>(collectionName);

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", async () =>
{
    var forecast = await collection.FindAsync(_ => true);
    return forecast.ToList();
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();