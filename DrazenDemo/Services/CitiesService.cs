using Microsoft.EntityFrameworkCore;
using DrazenDemo.Models;
using DrazenDemo.Data;

namespace DrazenDemo.Services;

public class CitiesService(DataContext context)
{
    private readonly DataContext context = context;

    public IEnumerable<City> GetAll()
    {
        return [.. context.Cities.AsNoTracking().Include(c => c.Country)];
    }

    public City? GetById(int id)
    {
        return context.Cities.AsNoTracking().Include(c => c.Country).SingleOrDefault(c => c.Id == id);
    }

    public bool CityExists(string? postalCode, int? countryId, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Cities.AsNoTracking().Any(c => c.PostalCode == postalCode && c.CountryId == countryId && c.Id != excludeId);
        }
        return context.Cities.AsNoTracking().Any(c => c.PostalCode == postalCode && c.CountryId == countryId);
    }

    public City? Create(City newCity)
    {
        context.Cities.Add(newCity);
        context.SaveChanges();
        var city = context.Cities.AsNoTracking().Include(c => c.Country).SingleOrDefault(c => c.Id == newCity.Id);
        return city;

    }

    public City? Update(City updatedCity)
    {
        context.Cities.Update(updatedCity);
        context.SaveChanges();
        var city = context.Cities.AsNoTracking().Include(c => c.Country).SingleOrDefault(c => c.Id == updatedCity.Id);
        return city;
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