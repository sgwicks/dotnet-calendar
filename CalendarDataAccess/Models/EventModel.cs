using MongoDB.Bson.Serialization.Attributes;

namespace CalendarDataAccess.Models;

public class EventModel
{
  [BsonId]
  [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public DateTime Start { get; set; }
  public DateTime End { get; set; }
  public int Tier { get; set; }
}
