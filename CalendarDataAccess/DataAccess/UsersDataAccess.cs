using MongoDB.Driver;

namespace CalendarDataAccess;

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

  public async Task<UserModel> GetUserByUsername(string username)
  {
    var usersCollection = UsersCollection();
    var results = await usersCollection.FindAsync(u => u.Username == username);

    return results.First();
  }

  public Task CreateUser(UserModel user)
  {
    var usersCollection = UsersCollection();

    return usersCollection.InsertOneAsync(user);
  }

  public Task UpdateUser(UserModel user)
  {
    var usersCollection = UsersCollection();
    var filter = Builders<UserModel>.Filter.Eq("Id", user.Id);

    return usersCollection.ReplaceOneAsync(filter, user, new ReplaceOptions { IsUpsert = true });
  }

  public Task DeleteUser(UserModel user)
  {
    var usersCollection = UsersCollection();

    return usersCollection.DeleteOneAsync(u => u.Id == user.Id);
  }
}
