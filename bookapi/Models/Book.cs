namespace bookapi.Models
{
  public record Book
  {
    public int Id { get; init; }
    public string Title { get; set; }
    public string Author { get; set; }
  }
}