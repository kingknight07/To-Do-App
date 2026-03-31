using MiniTodo.Web.Models;
using MiniTodo.Web.ViewModels;

namespace MiniTodo.Web.Services;

public interface ITaskService
{
    Task<IReadOnlyList<TaskItemViewModel>> GetAllAsync();
    Task<TaskItemViewModel?> GetByIdAsync(int id);
    Task<TaskItemViewModel> CreateAsync(TaskCreateUpdateDto dto);
    Task<TaskItemViewModel?> UpdateAsync(int id, TaskCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
