using DrazenDemo.Models;
using DrazenDemo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DrazenDemo.Controllers;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class CountryController(CountriesService service) : ControllerBase
{
    private readonly CountriesService service = service;

    [HttpGet]
    public IEnumerable<Country> GetAll()
    {
        return service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Country> GetById(int id)
    {
        var country = service.GetById(id);
        if (country == null) return NotFound("Country not found.");
        return country;
    }

    [HttpPost]
    public IActionResult Post(Country newCountry)
    {
        if (service.CodeExists(newCountry.Code))
            return BadRequest($"Country code {newCountry.Code} already exists.");

        if (service.NameExists(newCountry.Name))
            return BadRequest($"Country name {newCountry.Name} already exists.");

        var country = service.Create(newCountry);
        return CreatedAtAction(nameof(Post), new { id = country!.Id }, country);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Country country)
    {
        if (id != country.Id)
            return BadRequest("The provided country ID does not match the ID in the request body.");

        if (service.GetById(id) == null)
            return NotFound("Country not found.");

        if (service.CodeExists(country.Code, id))
            return BadRequest($"Country code {country.Code} already exists.");

        if (service.NameExists(country.Name, id))
            return BadRequest($"Country name {country.Name} already exists.");

        var updatedCountry = service.Update(country);
        return Ok(updatedCountry);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (service.GetById(id) == null)
            return NotFound("Country not found.");
        service.DeleteById(id);
        return NoContent();
    }
}

