using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

using DrazenDemo.Controllers;
using DrazenDemo.Models;
using DrazenDemo.Data;
using DrazenDemo.Data.Seeders;
using DrazenDemo.Services;

namespace DrazenDemo.Tests
{
    public class DrazenDemo_TestsWithRealDatabase: IDisposable
    {
        private readonly DataContext _context;
        private readonly CountriesController _controller;

        public DrazenDemo_TestsWithRealDatabase()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseSqlite("DataSource=DrazenDemo.Tests.TestDatabase.db")
                .Options;

            _context = new DataContext(options);
            _context.Database.EnsureDeleted();
            DbInitializer.Initialize(_context);

            _controller = new CountriesController(new CountriesService(_context));
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public void Test_GetAll()
        {
            var result = _controller.GetAll();
            Assert.NotNull(result);
        }

        [Theory]
        [InlineData(1, "HR", "Croatia")]
        [InlineData(2, "AE", "United Arab Emirates")]
        [InlineData(3, "US", "United States")]
        public void Test_GetById(int Id, string Code, string Name)
        {
            var result = _controller.GetById(Id);
            Assert.NotNull(result.Value);
            Assert.True(result.Value.Id == Id);
            Assert.True(result.Value.Code == Code);
            Assert.True(result.Value.Name == Name);
        }
        
        [Fact]
        public void Test_GetById_NotFound()
        {
            var result = _controller.GetById(0);
            Assert.Null(result.Value);
        }

        [Fact]
        public void Test_Post()
        {
            var newCountry = new Country() { Id = 100, Code = "QA", Name = "Qatar" };
            var action = _controller.Post(newCountry);
            Assert.NotNull(action);
            var result = action as CreatedAtActionResult;
            Assert.NotNull(result);
            var country = result.Value as Country;
            Assert.NotNull(country);
            Assert.True(country.Id == 100, "The returned country ID is not correct");  
            Assert.True(country.Code == "QA");
            Assert.True(country.Name == "Qatar");
        }
    }
}