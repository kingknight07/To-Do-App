# Mini To-Do App

Task management sample built with ASP.NET Core 6 and Angular.

## Stack

- ASP.NET Core 6 MVC + Web API
- Entity Framework Core InMemory
- Angular standalone app

## Run

### Backend

```powershell
dotnet run --project backend\MiniTodo.Web\MiniTodo.Web.csproj --launch-profile http
```

### Frontend

```powershell
cd frontend
npm install
npm start
```

## URLs

- Frontend: `http://localhost:4200`
- API: `http://localhost:5201/api/tasks`
- Swagger: `http://localhost:5201/swagger`
