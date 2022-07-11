using DeliveryService.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Interfaces
{
    public interface IDelivererService
    {
        List<DisplayOrderDto> GetPendingOrders();
        bool AcceptOrder(AcceptOrderDto info);
    }
}
