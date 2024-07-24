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
  public async Task<List<EventModel>> GetAllEvents(string? start, string? end)
  {
    DateTime dateStart = start is not null ? DateTime.Parse(start) : DateTime.Now.AddDays(-7);
    DateTime dateEnd = end is not null ? DateTime.Parse(end) : DateTime.Now.AddDays(7);
    var eventsCollection = EventsCollection();
    var results = await eventsCollection.FindAsync(e => e.Start >= dateStart && e.End <= dateEnd);

    return results.ToList();
  }

  public async Task<EventModel> GetEventById(string id)
  {
    var eventsCollection = EventsCollection();
    var results = await eventsCollection.FindAsync(u => u.Id == id);

    return results.First();
  }

  public async Task<EventModel> CreateEvent(EventModel calendarEvent)
  {
    var eventsCollection = EventsCollection();

    await eventsCollection.InsertOneAsync(calendarEvent);

    return calendarEvent;
  }

  public async Task<EventModel> UpdateEvent(EventModel calendarEvent)
  {
    var eventsCollection = EventsCollection();
    var filter = Builders<EventModel>.Filter.Eq("Id", calendarEvent.Id);

    await eventsCollection.ReplaceOneAsync(filter, calendarEvent, new ReplaceOptions { IsUpsert = true });

    return calendarEvent;
  }

  public async Task DeleteEvent(EventModel calendarEvent)
  {
    var eventsCollection = EventsCollection();

    await eventsCollection.DeleteOneAsync(u => u.Id == calendarEvent.Id);

    return;
  }
}
