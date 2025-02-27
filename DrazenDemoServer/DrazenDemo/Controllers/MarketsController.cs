using DrazenDemo.Models;
using DrazenDemo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DrazenDemo.Controllers;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class MarketsController(IMarketsService service) : ControllerBase
{
    private readonly IMarketsService service = service;

    [HttpGet]
    public IEnumerable<Market> GetAll()
    {
        return service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Market> GetById(int id)
    {
        var market = service.GetById(id);
        if (market == null) return NotFound("Market not found.");
        return market;
    }

    [HttpPost]
    public IActionResult Post(Market newMarket)
    {
        if (service.CodeExists(newMarket.Code))
            return BadRequest($"Market code {newMarket.Code} already exists.");

        if (service.NameExists(newMarket.Name))
            return BadRequest($"Market name {newMarket.Name} already exists.");

        var market = service.Create(newMarket);
        return CreatedAtAction(nameof(Post), new { id = market!.Id }, market);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Market market)
    {
        if (id != market.Id)
            return BadRequest("The provided market ID does not match the ID in the request body.");

        if (service.GetById(id) == null)
            return NotFound("Market not found.");

        if (service.CodeExists(market.Code, id))
            return BadRequest($"Market code {market.Code} already exists.");

        if (service.NameExists(market.Name, id))
            return BadRequest($"Market name {market.Name} already exists.");

        var updatedMarket = service.Update(market);
        return Ok(updatedMarket);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (service.GetById(id) == null)
            return NotFound("Market not found.");

        service.DeleteById(id);
        return NoContent();
    }
}