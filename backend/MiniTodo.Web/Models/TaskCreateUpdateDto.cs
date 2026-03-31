using System.ComponentModel.DataAnnotations;

namespace MiniTodo.Web.Models;

public class TaskCreateUpdateDto
{
    [Required]
    [StringLength(120, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public TaskStatus Status { get; set; } = TaskStatus.Pending;
}
