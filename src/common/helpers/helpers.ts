import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Helpers {
  constructor(private readonly configService: ConfigService) {}

  reemplazarCaracter(search: string, replace: string, sujeto: any) {
    const result = [];
    const _string = sujeto.toLowerCase();
    const _search = search.toLowerCase();
    let start = 0;
    let match;
    const length = _search.length;
    while ((match = _string.indexOf(_search, start)) >= 0) {
      result.push(sujeto.slice(start, match));
      start = match + length;
    }
    result.push(sujeto.slice(start));

    return result.join(replace);
  }
}
