using Microsoft.EntityFrameworkCore;
using DrazenDemo.Models;
using DrazenDemo.Data;

namespace DrazenDemo.Services;

public class CitiesService(DataContext context)
{
    private readonly DataContext context = context;

    public IEnumerable<City> GetAll()
    {
        return context.Cities.AsNoTracking().Include(c => c.Country).ToList();
    }

    public City? GetById(int id)
    {
        return context.Cities.AsNoTracking().Include(c => c.Country).SingleOrDefault(c => c.Id == id);
    }

    public bool CityExists(string? name, int? countryId, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Cities.AsNoTracking().Any(c => c.Name == name && c.CountryId == countryId && c.Id != excludeId);
        }
        return context.Cities.AsNoTracking().Any(c => c.Name == name && c.CountryId == countryId);
    }

    public City? Create(City newCity)
    {
        context.Cities.Add(newCity);
        context.SaveChanges();
        return newCity;
    }

    public void Update(City updatedCity)
    {
        context.Cities.Update(updatedCity);
        context.SaveChanges();
    }

    public void DeleteById(int id)
    {
        var city = context.Cities.Find(id);
        if (city != null)
        {
            context.Cities.Remove(city);
            context.SaveChanges();
        }
    }
}