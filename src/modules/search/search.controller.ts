import { Controller, Post, Body, Headers } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  busqueda(@Body() termino: { query: string }, @Headers() headers) {
    return this.searchService.busqueda(termino.query, headers.base);
  }
}
