declare interface IReccomendation {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}