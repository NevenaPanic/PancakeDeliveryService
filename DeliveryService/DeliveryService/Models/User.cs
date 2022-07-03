﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }        // ADMIN, CUSTOMER, DELIVERER
        public string UserPicture { get; set; }     // path leading to picture source
        public bool Verified { get; set; } = true;

        public User() { }
    }
}
