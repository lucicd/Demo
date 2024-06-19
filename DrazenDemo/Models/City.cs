using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DrazenDemo.Models;

[Index(nameof(Name), nameof(CountryId), IsUnique = true)]
public class City
{
    private string? name;
    private string? postalCode;

    [Key]
    public int? Id { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "City name is required.")]
    [MaxLength(50, ErrorMessage = "City name must not be more than 50 characters long.")]
    public string? Name
    {
        get { return name; }
        set { name = value?.Trim(); }
    }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Postal code is required.")]
    [MaxLength(15, ErrorMessage = "Postal code must not be more than 15 characters long.")]
    public string? PostalCode
    {
        get { return postalCode; }
        set { postalCode = value?.Trim(); }
    }

    [ForeignKey("Country")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Country is required.")]
    public int CountryId { get; set; }

    public Country? Country { get; set; }
}