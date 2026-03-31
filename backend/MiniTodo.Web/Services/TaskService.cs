using MiniTodo.Web.Models;
using MiniTodo.Web.Repositories;
using MiniTodo.Web.ViewModels;

namespace MiniTodo.Web.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<TaskItemViewModel>> GetAllAsync()
    {
        var tasks = await _repository.GetAllAsync();
        return tasks.Select(ToViewModel).ToList();
    }

    public async Task<TaskItemViewModel?> GetByIdAsync(int id)
    {
        var task = await _repository.GetByIdAsync(id);
        return task is null ? null : ToViewModel(task);
    }

    public async Task<TaskItemViewModel> CreateAsync(TaskCreateUpdateDto dto)
    {
        var now = DateTime.UtcNow;
        var task = new TaskItem
        {
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            Status = dto.Status,
            CreatedAt = now,
            UpdatedAt = now
        };

        await _repository.AddAsync(task);
        return ToViewModel(task);
    }

    public async Task<TaskItemViewModel?> UpdateAsync(int id, TaskCreateUpdateDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
        {
            return null;
        }

        existing.Title = dto.Title.Trim();
        existing.Description = dto.Description?.Trim();
        existing.Status = dto.Status;
        existing.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(existing);
        return ToViewModel(existing);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
        {
            return false;
        }

        await _repository.DeleteAsync(existing);
        return true;
    }

    private static TaskItemViewModel ToViewModel(TaskItem task)
    {
        return new TaskItemViewModel
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description ?? string.Empty,
            Status = task.Status,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }
}
