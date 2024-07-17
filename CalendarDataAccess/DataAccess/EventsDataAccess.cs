using MongoDB.Driver;
using CalendarDataAccess.Models;

namespace CalendarDataAccess.DataAccess;

public class EventsDataAccess: CalendarDataAccess
{
  private IMongoCollection<EventModel> EventsCollection()
  {
    return ConnectToMongo<EventModel>("Events");
  }

  // Events CRUD
  public async Task<List<EventModel>> GetAllEvents()
  {
    var eventsCollection = EventsCollection();
    var results = await eventsCollection.FindAsync(_ => true);

    return results.ToList();
  }

  public async Task<EventModel> GetEventByTitle(string title)
  {
    var eventsCollection = EventsCollection();
    var results = await eventsCollection.FindAsync(u => u.Title == title);

    return results.First();
  }

  public Task CreateEvent(EventModel Event)
  {
    var eventsCollection = EventsCollection();

    return eventsCollection.InsertOneAsync(Event);
  }

  public Task UpdateEvent(EventModel Event)
  {
    var eventsCollection = EventsCollection();
    var filter = Builders<EventModel>.Filter.Eq("Id", Event.Id);

    return eventsCollection.ReplaceOneAsync(filter, Event, new ReplaceOptions { IsUpsert = true });
  }

  public Task DeleteEvent(EventModel Event)
  {
    var eventsCollection = EventsCollection();

    return eventsCollection.DeleteOneAsync(u => u.Id == Event.Id);
  }
}
