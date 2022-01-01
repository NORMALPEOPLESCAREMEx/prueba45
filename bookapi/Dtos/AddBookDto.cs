namespace bookapi.Dtos
{
  public record AddBookDto
  {
    public string Title { get; init; }
    public string Author { get; init; }
  }
}