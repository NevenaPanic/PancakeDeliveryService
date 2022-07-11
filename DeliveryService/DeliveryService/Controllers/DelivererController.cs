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
    [Route("api/deliverers")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        // dodali service u kontroler
        private readonly IDelivererService _delivererService;

        public DelivererController(IDelivererService delivererService)
        {
            _delivererService = delivererService;
        }

        [HttpGet("getPendingOrders")]       // api/deliverers/getPendingOrders
        public IActionResult GetPendingOrders()
        {
            return Ok(_delivererService.GetPendingOrders());
        }

        [HttpPost("acceptOrder")]
        public IActionResult AcceptOrder([FromBody] AcceptOrderDto acceptOrder)
        {
            return Ok(_delivererService.AcceptOrder(acceptOrder));
        }
    }
}
