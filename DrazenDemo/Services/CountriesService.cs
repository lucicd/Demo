using Microsoft.EntityFrameworkCore;
using DrazenDemo.Models;
using DrazenDemo.Data;

namespace DrazenDemo.Services;

public class CountriesService(DataContext context)
{
    private readonly DataContext context = context;

    public IEnumerable<Country> GetAll()
    {
        return [.. context.Countries.AsNoTracking()];
    }

    public Country? GetById(int id)
    {
        return context.Countries.AsNoTracking().SingleOrDefault(c => c.Id == id);
    }

    public bool CodeExists(string? code, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Countries.AsNoTracking().Any(c => c.Code == code && c.Id != excludeId);
        }
        return context.Countries.AsNoTracking().Any(c => c.Code == code);
    }

    public bool NameExists(string? name, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Countries.AsNoTracking().Any(c => c.Name == name && c.Id != excludeId);
        }
        return context.Countries.AsNoTracking().Any(c => c.Name == name);
    }

    public Country? Create(Country newCountry)
    {
        context.Countries.Add(newCountry);
        context.SaveChanges();
        return newCountry;
    }

    public Country? Update(Country updatedCountry)
    {
        context.Countries.Update(updatedCountry);
        context.SaveChanges();
        var country = context.Countries.AsNoTracking().SingleOrDefault(c => c.Id == updatedCountry.Id);
        return country;
    }

    public void DeleteById(int id)
    {
        var country = context.Countries.Find(id);
        if (country != null)
        {
            context.Countries.Remove(country);
            context.SaveChanges();
        }
    }
}