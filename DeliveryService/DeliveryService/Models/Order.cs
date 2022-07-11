using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Models
{
    public class Order
    {
        // šta poručuje. Količina, adresa dostave, komentar i cenu
        public int OrderID { get; set; }
        public int DelivererID { get; set; }
        public int CustomerID { get; set; }
        public double Total { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public string Status { get; set; }  // PENDING, IN_DELIVERY, DELIVERED
        public DateTime Time { get; set; }

        public ICollection<OrderedProduct> OrderedProducts { get; set; }

        public Order() { }
    }
}
