using MiniTodo.Web.Models;
using TaskStatus = MiniTodo.Web.Models.TaskStatus;

namespace MiniTodo.Web.Data;

public static class SeedData
{
    public static void Initialize(IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (context.TaskItems.Any())
        {
            return;
        }

        context.TaskItems.AddRange(
            new TaskItem
            {
                Title = "Review project requirements",
                Description = "Confirm the MVC, API, and Angular checklist.",
                Status = TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new TaskItem
            {
                Title = "Build task API",
                Description = "Create CRUD endpoints for the mini to-do app.",
                Status = TaskStatus.Completed,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });

        context.SaveChanges();
    }
}
