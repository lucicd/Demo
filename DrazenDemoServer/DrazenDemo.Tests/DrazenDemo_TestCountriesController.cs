using Xunit;
using DrazenDemo.Controllers;
using DrazenDemo.Models;
using DrazenDemo.Tests.Fakes;
using Microsoft.AspNetCore.Mvc;

namespace DrazenDemo.Tests
{
    public class DrazenDemo_TestCountriesController
    {
        CountriesController _controller;

        public DrazenDemo_TestCountriesController()
        {
            var service = new CountriesServiceFake();
            _controller = new CountriesController(service);
        }

        [Fact]
        public void TeTest_GetAll()
        {
            var result = _controller.GetAll();
            Assert.NotNull(result);
        }

        [Fact]
        public void Test_GetById()
        {
            var result = _controller.GetById(1);
            Assert.NotNull(result.Value);
            Assert.True(result.Value.Id == 1);
            Assert.True(result.Value.Code == "HR");
            Assert.True(result.Value.Name == "Hrvatska");
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
            var newCountry = new Country() { Id = 4, Code = "US", Name = "United States" };
            var action = _controller.Post(newCountry);
            Assert.NotNull(action);
            var result = action as CreatedAtActionResult;
            Assert.NotNull(result);
            var country = result.Value as Country;
            Assert.NotNull(country);
            Assert.True(country.Id == 4, "The returned country ID is not correct");  
            Assert.True(country.Code == "US");
            Assert.True(country.Name == "United States");
        }
    }

    
}