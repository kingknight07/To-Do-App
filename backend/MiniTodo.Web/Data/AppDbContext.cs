using Microsoft.EntityFrameworkCore;
using MiniTodo.Web.Models;

namespace MiniTodo.Web.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> TaskItems => Set<TaskItem>();
}
