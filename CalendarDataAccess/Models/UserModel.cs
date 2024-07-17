using MongoDB.Bson.Serialization.Attributes;

namespace CalendarDataAccess;

public class UserModel
{
  [BsonId]
  [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
  public string Id { get; set; } = string.Empty;
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}
