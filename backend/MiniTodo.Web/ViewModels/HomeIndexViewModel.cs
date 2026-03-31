using MiniTodo.Web.Models;
using TaskStatus = MiniTodo.Web.Models.TaskStatus;

namespace MiniTodo.Web.ViewModels;

public class HomeIndexViewModel
{
    public HomeIndexViewModel(IReadOnlyList<TaskItemViewModel> tasks)
    {
        Tasks = tasks;
    }

    public IReadOnlyList<TaskItemViewModel> Tasks { get; }
    public int TotalTasks => Tasks.Count;
    public int PendingTasks => Tasks.Count(task => task.Status == TaskStatus.Pending);
    public int CompletedTasks => Tasks.Count(task => task.Status == TaskStatus.Completed);
}
