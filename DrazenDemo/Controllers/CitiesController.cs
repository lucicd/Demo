using DrazenDemo.Models;
using DrazenDemo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DrazenDemo.Controllers;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class CityController(CitiesService service) : ControllerBase
{
    private readonly CitiesService service = service;

    [HttpGet]
    public IEnumerable<City> GetAll()
    {
        return service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<City> GetById(int id)
    {
        var city = service.GetById(id);
        if (city == null) return NotFound("City not found.");
        return city;
    }

    [HttpPost]
    public IActionResult Post(City newCity)
    {
        if (service.CityExists(newCity.Name, newCity.CountryId))
            return BadRequest("City already exists.");

        var city = service.Create(newCity);
        return CreatedAtAction(nameof(Post), new { id = city!.Id }, city);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, City city)
    {
        if (id != city.Id)
            return BadRequest("The provided county ID does not match the ID in the request body.");

        if (service.GetById(id) == null)
            return NotFound("City not found.");

        if (service.CityExists(city.Name, city.CountryId, id))
            return BadRequest("City already exists.");

        service.Update(city);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (service.GetById(id) == null)
            return NotFound("City not found.");
        service.DeleteById(id);
        return NoContent();
    }
}

