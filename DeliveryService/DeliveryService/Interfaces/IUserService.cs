using DeliveryService.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Interfaces
{
    public interface IUserService
    {
        TokenDto Login(UserLoginDto loginDto);
        int Register(UserRegisterDto registerDto);
        List<UserDisplayDto> GetAllUsers();
        List<ProductDto> GetAllProducts();
        int MakeOrder(MakeOrderDto makeOrderDto);
    }
}
