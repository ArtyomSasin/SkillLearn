using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SkillLearn.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private static readonly PostDto[] Posts = new[]
        {
            new PostDto{
                Id = 1,
                Title = "Пост 1",
                Description = "фыв фы в",
                Tags = new[]{
                    "Тэг 1", "Тэг 2"
                },
            },
            new PostDto{
                Id = 2,
                Title = "Пост 2",
                Description = "фывячс яч ся",
                Tags = new[]{
                    "Тэг 2"
                },
            },
            new PostDto{
                Id = 3,
                Title = "Пост 3",
                Description = "ййцуй цуй ",
                Tags = new[]{
                    "Тэг 3"
                },
            },
            new PostDto{
                Id = 4,
                Title = "Пост 4",
                Description = "22222213123",
                Tags = new[]{
                    "Тэг 1",
                },
            },
            new PostDto{
                Id = 5,
                Title = "Пост 5",
                Description = "32423 423 ",
                Tags = new[]{
                    "Тэг 2"
                },
            },
        };

        private readonly ILogger<PostController> _logger;

        public PostController(ILogger<PostController> logger)
        {
            _logger = logger;
        }

        [HttpGet("get")]
        public Task<PostDto> Get(int postId)
        {
            var rng = new Random();
            return Task.FromResult(Posts.FirstOrDefault(_ => _.Id == postId));
        }

        [HttpGet("getAll")]
        public Task<PostDto[]> GetAll()
        {
            return Task.FromResult(Posts);
        }
    }
}
