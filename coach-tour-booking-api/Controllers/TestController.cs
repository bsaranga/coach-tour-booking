using Microsoft.AspNetCore.Mvc;

namespace coach_tour_booking_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("helloworld")]
        public IActionResult SayHello()
        {
            return Ok("Hello World");
        }
    }
}
