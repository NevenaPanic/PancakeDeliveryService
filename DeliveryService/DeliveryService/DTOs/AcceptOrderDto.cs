﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.DTOs
{
    public class AcceptOrderDto
    {
        public int OrderID { get; set; }
        public int DelivererID { get; set; }
    }
}