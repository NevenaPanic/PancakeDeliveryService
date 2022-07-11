using DeliveryService.DTOs;
using DeliveryService.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        // dodali service u kontroler
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("addProduct")] // api/admins/addProduct
        public IActionResult Login([FromBody] ProductDto productInfo)
        {
            return Ok(_adminService.AddProduct(productInfo));
        }

        [HttpGet("getAllUsers")]
        public IActionResult GetAllUsers()
        {
            return Ok(_adminService.GetAllUsers());
        }

        // verify / reject user
        [HttpPost("rejectUser")]
        public IActionResult RejectUser([FromBody] int id)
        {
            return Ok(_adminService.RejectUser(id));
        }

        [HttpPost("verifyUser")]
        public IActionResult VerifyUser([FromBody] int id)
        {
            return Ok(_adminService.VerifyUser(id));
        }

        [HttpGet("getAllOrders")]
        public IActionResult GetAllOrders()
        {
            return Ok(_adminService.GetAllOrders());
        }
    }
}
