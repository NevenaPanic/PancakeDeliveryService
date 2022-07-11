using DeliveryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.DTOs
{
    public class DisplayOrderDto
    {
        public int OrderID { get; set; }
        public int DelivererID { get; set; }
        public string DelivererFullName { get; set; }
        public string DelivererUsername { get; set; }
        public int CustomerID { get; set; }
        public string CustomerFullName { get; set; }
        public string CustomerUsername { get; set; }
        public double Total { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public string Status { get; set; }  // PENDING, IN_DELIVERY, DELIVERED
        public DateTime Time { get; set; }

        public string OrderItems { get; set; }

        public DisplayOrderDto() { }
    }
}
