using DeliveryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.DTOs
{
    public class MakeOrderDto
    {
        public int CustomerId { get; set; }
        public double Total { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }

        public List<OrderedProduct> OrderedProducts { get; set; }
    }
}
