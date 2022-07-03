using AutoMapper;
using DeliveryService.DTOs;
using DeliveryService.Infrastructure;
using DeliveryService.Interfaces;
using DeliveryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DeliveryService.Services
{
    public class AdminService : IAdminService
    {
        // added mapper to my service
        private readonly IMapper _mapper;
        private readonly PancakeShopDbContext _dbContext;

        public AdminService(IMapper mapper, PancakeShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public bool AddProduct(ProductDto product)
        {
            var exists = _dbContext.Products.Where( x => x.Name == product.Name).FirstOrDefault();
            if (exists != null)
            {
                return false;
            }
            else
            {
                Product newProduct = _mapper.Map<Product>(product);
                _dbContext.Products.Add(newProduct);
                _dbContext.SaveChanges();

                return true;
            }
        }

        public List<UserDisplayDto> GetAllUsers()
        {
            List<User> allUsers = _dbContext.Users.ToList();
            List<UserDisplayDto> displayUsers = new List<UserDisplayDto>();

            foreach (User user in allUsers) 
            {
                displayUsers.Add(_mapper.Map<UserDisplayDto>(user));
            }

            return displayUsers;
        }

        public bool RejectUser(int id)
        {
            User rejectedDeliverer = _dbContext.Users.ToList().Find(x => x.Id == id);
            if (rejectedDeliverer != null) {
                rejectedDeliverer.Verified = false;
                _dbContext.Update(rejectedDeliverer);
                _dbContext.SaveChanges();
                _dbContext.Entry(rejectedDeliverer).Reload();
                string message = "Hello, \n" +
                                 "You've been rejected for the deliverer position in Pancake Delivery Service!";

                SendEmail(rejectedDeliverer.Email, message);

                return true;
            }

            return false;
        }

        public bool VerifyUser(int id)
        {
            User verifiedDeliverer = _dbContext.Users.ToList().Find(x => x.Id == id);
            if (verifiedDeliverer != null)
            {
                verifiedDeliverer.Verified = true;
                _dbContext.Update(verifiedDeliverer);
                _dbContext.SaveChanges();
                _dbContext.Entry(verifiedDeliverer).Reload();
                string message = "Hello, \n" +
                                 "We are happy to welcom you as the new employee at Pancake Delivery Service! :D";

                SendEmail(verifiedDeliverer.Email, message);

                return true;
            }

            return false;
        }

        private void SendEmail(string recipient, string message)
        {
            string email = "nevena.panic99@gmail.com";
            string password = "jkhnrsievizvfkyt";
            // password: jkhnrsievizvfkyt

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(email, password),
                Timeout = 20000
            };

            smtpClient.Send(email, recipient, "Notification from Pancake Delivery Service", message);
        }
    }
}
