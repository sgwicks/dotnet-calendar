using MongoDB.Driver;

namespace CalendarDataAccess;

public class CalendarDataAccess
{
  private readonly string ConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING") ?? "";
  private const string DatabaseName = "calendar_db";

  protected IMongoCollection<T> ConnectToMongo<T>(in string collection)
  {
    var client = new MongoClient(ConnectionString);
    var db = client.GetDatabase(DatabaseName);

    return db.GetCollection<T>(collection);
  }
}
