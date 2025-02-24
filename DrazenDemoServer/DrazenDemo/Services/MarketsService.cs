using Microsoft.EntityFrameworkCore;
using DrazenDemo.Models;
using DrazenDemo.Data;

namespace DrazenDemo.Services;

public class MarketsService(DataContext context)
{
    private readonly DataContext context = context;

    public IEnumerable<Market> GetAll()
    {
        return context.Markets.AsNoTracking();
    }

    public Market? GetById(int id)
    {
        return context.Markets.AsNoTracking().SingleOrDefault(m => m.Id == id);
    }

    public bool CodeExists(string? code, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Markets.AsNoTracking().Any(m => m.Code == code && m.Id != excludeId);
        }
        return context.Markets.AsNoTracking().Any(m => m.Code == code);
    }

    public bool NameExists(string? name, int? excludeId = null)
    {
        if (excludeId.HasValue)
        {
            return context.Markets.AsNoTracking().Any(m => m.Name == name && m.Id != excludeId);
        }
        return context.Markets.AsNoTracking().Any(m => m.Name == name);
    }

    public Market? Create(Market newMarket)
    {
        context.Markets.Add(newMarket);
        context.SaveChanges();
        return newMarket;
    }

    public Market? Update(Market updatedMarket)
    {
        context.Markets.Update(updatedMarket);
        context.SaveChanges();
        var market = context.Markets.AsNoTracking().SingleOrDefault(m => m.Id == updatedMarket.Id);
        return market;
    }

    public void DeleteById(int id)
    {
        var market = context.Markets.Find(id);
        if (market != null)
        {
            context.Markets.Remove(market);
            context.SaveChanges();
        }
    }
}