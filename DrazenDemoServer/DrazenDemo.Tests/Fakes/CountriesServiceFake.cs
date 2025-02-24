using DrazenDemo.Models;
using DrazenDemo.Services;

namespace DrazenDemo.Tests.Fakes
{
    public class CountriesServiceFake : ICountriesService
    {
        private readonly List<Country> _countries;

        public CountriesServiceFake()
        {
            _countries = new List<Country>()
            {
                new Country() { Id = 1, Code="HR", Name = "Hrvatska" },
                new Country() { Id = 2, Code="DE", Name = "Deutschland" },
                new Country() { Id = 3, Code="GB", Name = "Great Britain" }
            };
        }

        public IEnumerable<Country> GetAll()
        {
            return _countries;
        }

        public Country? GetById(int id)
        {
            return _countries.FirstOrDefault(c => c.Id == id);
        }

        public bool CodeExists(string? code, int? excludeId = null)
        {
            if (excludeId.HasValue)
            {
                return _countries.Any(c => c.Code == code && c.Id != excludeId);
            }
            return _countries.Any(c => c.Code == code);
        }

        public bool NameExists(string? name, int? excludeId = null)
        {
           if (excludeId.HasValue)
            {
                return _countries.Any(c => c.Name == name && c.Id != excludeId);
            }
            return _countries.Any(c => c.Name == name);
        }

        public Country? Create(Country newCountry)
        {
            _countries.Add(newCountry);
            return newCountry;
        }

        public Country? Update(Country updatedCountry)
        {
            throw new NotImplementedException("Not implemented");
        }

        public void DeleteById(int id)
        {
            throw new NotImplementedException("Not implemented");
        }

        public bool CitiesExist(int id)
        {
            throw new NotImplementedException("Not implemented");
        }
    }
}