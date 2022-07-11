using AutoMapper;
using DeliveryService.DTOs;
using DeliveryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // mapira user -> userDto i isto tako userDto -> user, jer im se polja zovu identicno
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserDisplayDto>().ReverseMap();
            CreateMap<User, UserRegisterDto>().ReverseMap();
            // product
            CreateMap<Product, ProductDto>().ReverseMap();
            // Order
            CreateMap<Order, MakeOrderDto>().ReverseMap();
            CreateMap<Order, DisplayOrderDto>().ReverseMap();
        }
    }
}
