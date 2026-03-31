using System.ComponentModel.DataAnnotations;

namespace MiniTodo.Web.Models;

public class TaskItem
{
    public int Id { get; set; }

    [Required]
    [StringLength(120, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public TaskStatus Status { get; set; } = TaskStatus.Pending;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
