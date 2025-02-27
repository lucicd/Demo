using DrazenDemo.Models;

namespace DrazenDemo.Services
{
    public interface IMarketsService
    {
        IEnumerable<Market> GetAll();
        
        Market? GetById(int id);

        bool CodeExists(string? code, int? excludeId = null);

        bool NameExists(string? name, int? excludeId = null);

        Market? Create(Market newMarket);

        Market? Update(Market updatedMarket);

        void DeleteById(int id);

    }
}