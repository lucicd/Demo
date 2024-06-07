using DrazenDemo.Models;

namespace DrazenDemo.Data.Seeders;

public static class CountriesSeeder
{
    public static void Run(DataContext context)
    {
        if (context.Countries.Any())
        {
            return;
        }

        var items = new Country[]
        {
            new() { Code = "HR", Name = "Croatia" },
            new() { Code = "AE", Name = "United Arab Emirates" },
            new() { Code = "US", Name = "United States" },
            new() { Code = "CA", Name = "Canada" },
            new() { Code = "MX", Name = "Mexico" },
            new() { Code = "DE", Name = "Germany" },
            new() { Code = "FR", Name = "France" },
            new() { Code = "GB", Name = "United Kingdom" },
            new() { Code = "JP", Name = "Japan" },
            new() { Code = "AU", Name = "Australia" },
            new() { Code = "BR", Name = "Brazil" },
            new() { Code = "IT", Name = "Italy" },
            new() { Code = "IN", Name = "India" }
        };

        foreach (Country item in items)
        {
            context.Countries.Add(item);
        }

        context.SaveChanges();
    }
}