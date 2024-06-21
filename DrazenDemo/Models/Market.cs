using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DrazenDemo.Models;

[Index(nameof(Code), IsUnique = true)]
[Index(nameof(Name), IsUnique = true)]
public class Market
{
    private string? code;
    private string? name;

    [Key]
    public int? Id { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Market code is required.")]
    [MaxLength(5, ErrorMessage = "Market code must not be more than 5 characters long.")]
    public string? Code
    {
        get { return code; }
        set { code = value?.Trim().ToUpper(); }
    }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Market name is required.")]
    [MaxLength(50, ErrorMessage = "Market name must not be more than 50 characters long.")]
    public string? Name
    {
        get { return name; }
        set { name = value?.Trim(); }
    }
}