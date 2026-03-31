using Microsoft.AspNetCore.Mvc;
using MiniTodo.Web.Services;
using MiniTodo.Web.ViewModels;

namespace MiniTodo.Web.Controllers;

public class HomeController : Controller
{
    private readonly ITaskService _taskService;

    public HomeController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    public async Task<IActionResult> Index()
    {
        var tasks = await _taskService.GetAllAsync();
        var model = new HomeIndexViewModel(tasks);

        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View();
    }
}
