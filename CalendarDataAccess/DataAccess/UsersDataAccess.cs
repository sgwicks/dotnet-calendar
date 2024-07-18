using MongoDB.Driver;
using CalendarDataAccess.Models;

namespace CalendarDataAccess.DataAccess;

public class UsersDataAccess: CalendarDataAccess
{
  private IMongoCollection<UserModel> UsersCollection()
  {
    return ConnectToMongo<UserModel>("users");
  }

  // USERS CRUD
  public async Task<List<UserModel>> GetAllUsers()
  {
    var usersCollection = UsersCollection();
    var results = await usersCollection.FindAsync(_ => true);

    return results.ToList();
  }

  public async Task<UserModel> GetUserById(string id)
  {
    var usersCollection = UsersCollection();
    var results = await usersCollection.FindAsync(u => u.Id == id);

    return results.First();
  }

  public async Task<UserModel> CreateUser(UserModel user)
  {
    var usersCollection = UsersCollection();

    await usersCollection.InsertOneAsync(user);

    return user;
  }

  public async Task<UserModel> UpdateUser(UserModel user)
  {
    var usersCollection = UsersCollection();
    var filter = Builders<UserModel>.Filter.Eq("Id", user.Id);

    await usersCollection.ReplaceOneAsync(filter, user, new ReplaceOptions { IsUpsert = true });
    
    return user; 
  }

  public async Task DeleteUser(UserModel user)
  {
    var usersCollection = UsersCollection();

    await usersCollection.DeleteOneAsync(u => u.Id == user.Id);

    return;
  }
}
