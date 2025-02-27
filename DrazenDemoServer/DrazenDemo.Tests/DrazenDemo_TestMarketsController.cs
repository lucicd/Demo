using Xunit;
using Moq;
using DrazenDemo.Services;
using DrazenDemo.Controllers;
using DrazenDemo.Models;

namespace DrazenDemo.Tests;

public class DrazenDemo_TestMarketsContoller
{
    private readonly List<Market> _markets = new List<Market>()
    {
        new Market() { Id=1, Code="MEA", Name="Middle East & Africa"},
        new Market() { Id=2, Code="APAC", Name="Asia Pacific"},
        new Market() { Id=3, Code="EU", Name="Europe"},
    };

    private readonly Mock<IMarketsService> _service;
    private readonly MarketsController _controller;

    
    public DrazenDemo_TestMarketsContoller()
    {
        _service = new Mock<IMarketsService>();
        _service.Setup(m => m.GetAll()).Returns(_markets);

        _service.Setup(m => m.GetById(1)).Returns(_markets[0]);
        _service.Setup(m => m.GetById(2)).Returns(_markets[1]);
        _service.Setup(m => m.GetById(3)).Returns(_markets[2]);
        
        _controller = new MarketsController(_service.Object);
    }
    
    
    [Fact]
    public void Test_GetAll()
    {
        var result = _controller.GetAll();
        Assert.NotNull(result);
    }

    [Fact]
    public void Test_GetById()
    {
        var result = _controller.GetById(1);
        Assert.NotNull(result);
        Assert.NotNull(result.Value);
        Assert.Equal(1, result.Value.Id);
        Assert.Equal("MEA", result.Value.Code);
        Assert.Equal("Middle East & Africa", result.Value.Name);
    }
}