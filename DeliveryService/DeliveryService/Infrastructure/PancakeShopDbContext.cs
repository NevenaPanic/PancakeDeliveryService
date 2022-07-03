using DeliveryService.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryService.Infrastructure
{
    public class PancakeShopDbContext : DbContext
    {
        // DbSets baze
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        public PancakeShopDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PancakeShopDbContext).Assembly);
        }
    }
}
