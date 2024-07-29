# Dotnet Calendar

A .NET Minimal API with a React Front End. With time, this may be updated (see TODO) but for now it's simple CRUD operations on User and Event Models in MongoDB, which relies on the front end doing most of the work and passing complete objects to the back end.

## Architecture Choices

The technology used for this app were mainly chosen for learning potential above all else. These are languages and frameworks I have a little exposure to, but not much, and I wanted to display some basic understanding of them for potential employers.

### .NET Minimal API

I chose .NET because it's a language I'm quickly falling in love with. I enjoy the type safety of it at a conceptual level, and its performance speed.

I opted for a Minimal API format partially because this is supposed to be a lightweight application that doesn't require much formal structure, and partially because I haven't built a Minimal API before. All the endpoints exist within `Program.cs` and simply call Model functions with the data they are passed. I created basic CRUD operations so that there's a flavour of everything, and so that a basic front end should be able to do anything with this simple API.

### MongoDB

My database experience is entirely SQL-based, and so this seemed like a good opportunity to test the waters of NoSQL databases. Using MongoDB here has worked out well for a couple of reasons:

Firstly, it allows me to maintain the incredibly simple structure of the Minimal CRUD API. Since it's storing objects in BSON, it's possible for a JSON object from the front end to pass right through an endpoint and into the database with almost no intervening logic. This allows me to maintain a simple, hands-off API so that I can focus on front end logic.

Secondly, while it's not shown off yet in the app, a Calendar Event has the potential to become quite an elaborate object, perhaps poorly suited to a strict SQL-based structure. With MongoDB a user should be able to create their own keys on a calendar event (front end allowing) and store them as they see fit. We can also start adding more complexity to calendar events as we add more features, without worrying too much about updating existing data to support a structure they will never use.

### HTML-first React

My primary front end experience is with Vue, but there's plenty to love about React and it has a huge market share. I chose React purely to test and showcase my ability to use it.

For a "real" greenfield app I might have preferred to use a SSR framework like Next or Remix, but there's still a large portion of SPA-style React Apps out there, and so it's important to learn how they're built. Nonetheless, I tried to stick to modern HTML-first sensibilities while building this, which is why you'll see `<form>` tags with `submit` functionality, even if it is slightly bastardised to fit the JS nature of an SPA.

### Redux & RTK Query

Initially I wanted to add Redux to the project in order to learn it well - I've had tech tests go badly in the past due to a lack of Redux knowledge. However, there wasn't much need to use it here due to the focus on using forms over state.

What I did discover, though, was the RTK Query side of Redux, allowing me to make efficient API calls without building out or importing a separate fetch package, introducing caching and inter-component communication in an incredibly simple way. I love it!

## TODO

### API

- Hash passwords
- Authentication
- Authorization
- Request validation
- Error handling

### Front End

- User functionality
  - Sign up
  - Login
  - User state
- Robust form validation
- Error handling
- Styles
- Date navigation (see next week, last week etc.)
- Delete event
- Split day/time options in form (1 day, then start and end time)
- Event clashes
  - This is what the tier system is for
