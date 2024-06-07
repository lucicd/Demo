using DrazenDemo.Data.Seeders;

namespace DrazenDemo.Data;

public class DbInitializer
{
    public static void Initialize(DataContext context)
    {
        context.Database.EnsureCreated();

        CountriesSeeder.Run(context);
        CitiesSeeder.Run(context);
    }
}