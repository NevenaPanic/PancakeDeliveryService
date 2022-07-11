using AutoMapper;
using DeliveryService.DTOs;
using DeliveryService.Infrastructure;
using DeliveryService.Interfaces;
using DeliveryService.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryService.Services
{
    public class UserService : IUserService
    {
        // added mapper to my service
        private readonly IMapper _mapper;
        private readonly PancakeShopDbContext _dbContext;

        // BCrypt will use this
        private readonly IConfigurationSection _secretKey;
        public UserService(IMapper mapper, PancakeShopDbContext dbContext, IConfiguration config)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");

            // da dodam admina na pocetku u novu bazu da ga ne kucam svaki put
            /*
            if (_dbContext.Users.Where(x => x.Email == "neska@gmail.com").FirstOrDefault() == null)
            { 
                // adding me aka Admin
                User admin = new User()
                {
                    Id = 0,
                    Name = "Nevena",
                    LastName = "Panić",
                    Username = "Neska",
                    Email = "neska@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("123"),
                    UserPicture = "Resources\\Images\\chick_cry.png",
                    Address = "Dositejeva 162 Kikinda",
                    DateOfBirth = new DateTime(1999, 7, 24),
                    UserType = "admin",
                    Verified = true
                };
                _dbContext.Users.Add(admin);
                _dbContext.SaveChanges();
            }*/
        }

        public List<UserDisplayDto> GetAllUsers()
        {
            return _mapper.Map<List<UserDisplayDto>>(_dbContext.Users.ToList().OrderByDescending(x => x.UserType));
        }

        public List<ProductDto> GetAllProducts()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public int MakeOrder(MakeOrderDto makeOrderDto)
        {
            Order newOrder = _mapper.Map<Order>(makeOrderDto);

            var productIds = _dbContext.Products.Select(x => x.Id).ToList();    // get all product Id to check if ordered products are valid
            foreach (var orderedProduct in newOrder.OrderedProducts)
            {
                if (!productIds.Contains(orderedProduct.ProductID))
                {
                    return -1;
                }
            }

            var customer = _dbContext.Users.ToList().Where(x => x.Id == newOrder.CustomerID).FirstOrDefault();

            if (customer == null)
            {
                return -2;      // customer not in db
            }
            else if (String.IsNullOrEmpty(newOrder.DeliveryAddress))
            {
                return -3;      // no address
            }
            else if (newOrder.OrderedProducts.Count == 0)
            {
                return -4;      // no ordered products
            }
            else if (newOrder.Total < 9.5)      // delivery fee + min price item x 1 = 9.5
            {
                return -5;
            }
            else
            {
                newOrder.OrderID = 0;
                newOrder.Time = DateTime.Now;
                newOrder.Status = "PENDING";
                newOrder.DelivererID = -1;
                _dbContext.Add(newOrder);   // add to db
                _dbContext.SaveChanges();   // save

                newOrder = _dbContext.Orders.ToList().Last();   // read it from db to get orderID

                foreach (var product in newOrder.OrderedProducts)
                {
                    product.OrderID = newOrder.OrderID;
                    product.Order = newOrder;
                    product.Product = _dbContext.Products.ToList().Find(x => x.Id == product.ProductID);
                }

                _dbContext.Update(newOrder);    // update
                _dbContext.SaveChanges();       // save again

                return 0;       // all ok
            }
        }

        // ======================================= Access Control =========================================================================
        public int Register(UserRegisterDto registerDto)
        {
            User newUser = _mapper.Map<User>(registerDto);

            if (newUser.UserType != "deliverer") 
            {
                newUser.Verified = true;
            }

            var allUsers = _dbContext.Users.ToList().Where( x => x.Email == newUser.Email);
            if (allUsers.Count() > 0)
            {
                return -1;
            }
            else
            { 
                // Hashed password before adding user in database
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

                // New user added and saved in database
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();

                return 0;
            }
        }

        public TokenDto Login(UserLoginDto loginDto)
        {
            // add logic for logging in
            User user = _dbContext.Users.ToList().Where(x => x.Email == loginDto.Email).FirstOrDefault();

            if (user == null)
                return new TokenDto() { Token = "-1"};      // unknown user email - error

            // commpare hashed passwords
            if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                List<Claim> claims = new List<Claim>();
                // token claims
                claims.Add(new Claim("id", user.Id.ToString()));
                claims.Add(new Claim("email", user.Email));
                claims.Add(new Claim("username", user.Username));
                claims.Add(new Claim("type", user.UserType));
                claims.Add(new Claim("verified", user.Verified.ToString()));
                claims.Add(new Claim(ClaimTypes.Role, user.UserType));

                // create token
                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44352",           //url servera koji je izdao token, moj server
                    claims: claims,                             //claimovi
                    expires: DateTime.Now.AddMinutes(30),       // vazenje tokena u minutama - 30
                    signingCredentials: signinCredentials       // kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return  new TokenDto() { Token = tokenString };      // success
            }    
            else
                return new TokenDto() { Token = "-2" };             // wrong password
        }
    }
}
