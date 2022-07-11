using DeliveryService.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Interfaces
{
    public interface IAdminService
    {
        bool AddProduct(ProductDto product);
        List<UserDisplayDto> GetAllUsers();

        bool RejectUser(int id);
        bool VerifyUser(int id);
        List<DisplayOrderDto> GetAllOrders();
    }
}
