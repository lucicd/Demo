using DrazenDemo.Models;
using System.Collections.Generic;

namespace DrazenDemo.Services
{
    public interface ICountriesService
    {
        IEnumerable<Country> GetAll();
        
        Country? GetById(int id);

        bool CodeExists(string? code, int? excludeId = null);

        bool NameExists(string? name, int? excludeId = null);

        Country? Create(Country newCountry);

        Country? Update(Country updatedCountry);

        void DeleteById(int id);

        bool CitiesExist(int id);

    }
}
