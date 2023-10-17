using System.Text.Json.Serialization;

namespace AnimalCaretakers.Paginations;

public class Pager
{
    private int pageIndex = 1;

    public int PageSize { get; set; } = 20;
    public int? TotalPages => TotalRows.HasValue ? ((TotalRows - 1) / PageSize) + 1 : null;
    [JsonIgnore]
    public int? TotalRows { get; set; }
    public int PageIndex
    {
        get => pageIndex;
        set
        {
            pageIndex = value;
            if (pageIndex < 1) pageIndex = 1;
            if (TotalPages.HasValue && pageIndex > TotalPages) pageIndex = TotalPages.Value;
        }
    }
    public string Sort { get; set; } = "Id";
    public string Order { get; set; } = "ASC";
}
