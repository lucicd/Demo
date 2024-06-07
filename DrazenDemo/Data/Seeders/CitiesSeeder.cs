using DrazenDemo.Models;
using Microsoft.VisualBasic;

namespace DrazenDemo.Data.Seeders;

public static class CitiesSeeder
{
    public static void Run(DataContext context)
    {
        if (context.Cities.Any())
        {
            return;
        }

        var idOfCroatia = context.Countries.FirstOrDefault(c => c.Code == "HR")?.Id ?? 0;
        var idOfUS = context.Countries.FirstOrDefault(c => c.Code == "US")?.Id ?? 0;
        var idOfGermany = context.Countries.FirstOrDefault(c => c.Code == "DE")?.Id ?? 0;

        var items = new City[]
        {
            //5 cities in Croatia
            new () { Name = "Zagreb",  PostalCode = "10000", CountryId = idOfCroatia },
            new () { Name = "Split", PostalCode = "21000", CountryId = idOfCroatia },
            new () { Name = "Rijeka", PostalCode = "51000", CountryId = idOfCroatia },
            new () { Name = "Osijek", PostalCode = "31000", CountryId = idOfCroatia },
            new () { Name = "Zadar", PostalCode = "23000", CountryId = idOfCroatia },

            //5 cities in US
            new () { Name = "New York", PostalCode = "10001", CountryId = idOfUS },
            new () { Name = "Los Angeles", PostalCode = "90001", CountryId = idOfUS },
            new () { Name = "Chicago", PostalCode = "60601", CountryId = idOfUS },
            new () { Name = "Houston", PostalCode = "77001", CountryId = idOfUS },
            new () { Name = "Miami", PostalCode = "33101", CountryId = idOfUS },

            //5 cities in Germany
            new () { Name = "Berlin", PostalCode = "10115", CountryId = idOfGermany },
            new () { Name = "Hamburg", PostalCode = "20095", CountryId = idOfGermany },
            new () { Name = "Munich", PostalCode = "80331", CountryId = idOfGermany },
            new () { Name = "Cologne", PostalCode = "50667", CountryId = idOfGermany },
            new () { Name = "Frankfurt", PostalCode = "60311", CountryId = idOfGermany }
        };

        foreach (City item in items)
        {
            context.Cities.Add(item);
        }

        context.SaveChanges();
    }
}