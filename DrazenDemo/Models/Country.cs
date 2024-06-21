using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DrazenDemo.Models;

[Index(nameof(Code), IsUnique = true)]
[Index(nameof(Name), IsUnique = true)]
public class Country
{
    private string? code;
    private string? name;

    [Key]
    public int? Id { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Country code is required.")]
    [MaxLength(2, ErrorMessage = "Country code must not be more than 2 characters long.")]
    public string? Code
    {
        get { return code; }
        set { code = value?.Trim(); }
    }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Country name is required.")]
    [MaxLength(50, ErrorMessage = "Country name must not be more than 50 characters long.")]
    public string? Name
    {
        get { return name; }
        set { name = value?.Trim(); }
    }


    public ICollection<City>? Cities { get; set; }
}
