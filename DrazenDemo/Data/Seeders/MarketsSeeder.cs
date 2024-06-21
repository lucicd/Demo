using DrazenDemo.Models;

namespace DrazenDemo.Data.Seeders;

public static class MarketsSeeder
{
    public static void Run(DataContext context)
    {
        if (context.Markets.Any())
        {
            return;
        }

        var items = new Market[]
        {
            new () { Code="MEA", Name="Middle East & Africa"},
            new () { Code="APAC", Name="Asia Pacific"},
            new () { Code="EU", Name="Europe"},
            new () { Code="NA", Name="North America"},
            new () { Code="SA", Name="South America"},
            new () { Code="OC", Name="Oceania"}
        };

        foreach (Market item in items)
        {
            context.Markets.Add(item);
        }

        context.SaveChanges();
    }
}