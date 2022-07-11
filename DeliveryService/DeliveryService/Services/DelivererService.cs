using AutoMapper;
using DeliveryService.DTOs;
using DeliveryService.Infrastructure;
using DeliveryService.Interfaces;
using DeliveryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Services
{
    public class DelivererService : IDelivererService
    {
        // added mapper to my service
        private readonly IMapper _mapper;
        private readonly PancakeShopDbContext _dbContext;

        public DelivererService(IMapper mapper, PancakeShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public bool AcceptOrder(AcceptOrderDto info)
        {
            // fali provera deliverer-a da li je on slobodan za dostavu

            Order acceptedOrder = _dbContext.Orders.Find(info.OrderID);
            User deliverer = _dbContext.Users.Find(info.DelivererID);
            // all busy deliverers
            List<int> busyDeliverers = _dbContext.Orders.Where(x => x.Status.Equals("IN_DELIVERY")).Select( x => x.DelivererID).ToList();

            if (!(deliverer != null && deliverer.UserType == "deliverer" && deliverer.Verified == true && !busyDeliverers.Contains(deliverer.Id)))
            {
                return false;
            }

            if (acceptedOrder != null && acceptedOrder.Status == "PENDING" && acceptedOrder.DelivererID == -1)
            {
                acceptedOrder.Status = "IN_DELIVERY";
                acceptedOrder.DelivererID = info.DelivererID;
                Random rnd = new Random();
                // 2 min - 20 min form the time of accepting the order
                acceptedOrder.Time = DateTime.Now.AddSeconds(rnd.Next(120, 1200)); 
                _dbContext.Update(acceptedOrder);
                _dbContext.SaveChanges();
                _dbContext.Entry(acceptedOrder).Reload();

                return true;
            }

            return false;
        }

        public List<DisplayOrderDto> GetPendingOrders()
        {
            List<Order> pendingOrders = _dbContext.Orders.Where(x => x.Status.Equals("PENDING")).ToList();
            List<DisplayOrderDto> displays = new List<DisplayOrderDto>();

            foreach (var order in pendingOrders)
            {
                DisplayOrderDto display = _mapper.Map<DisplayOrderDto>(order);
                // get users
                User customer = _dbContext.Users.Find(order.CustomerID);
                display.CustomerFullName = String.Format("{0} {1}", customer.Name, customer.LastName);
                display.CustomerUsername = customer.Username;

                // get all product IDs
                var orderedProducts = _dbContext.OrderedProducts.Where(x => x.OrderID == order.OrderID).Select(x => new { x.ProductID, x.Quantity}).ToList();
                List<Product> products = _dbContext.Products.ToList();
                // than get all products by IDs
                foreach (var item in orderedProducts)
                {
                    Product product = _dbContext.Products.Find(item.ProductID);
                    display.OrderItems += String.Format("{0} [{1} €] x {2} = {3}€" + Environment.NewLine, product.Name, product.Price, item.Quantity, item.Quantity * product.Price);
                }
                displays.Add(display);
            }

            return displays;
        }
    }
}
