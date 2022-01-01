namespace bookapi.Dtos
{
  public record BookDto
  {
    public int Id { get; init; }
    public string Title { get; init; }
    public string Author { get; init; }
  }
}