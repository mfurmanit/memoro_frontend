import { Pipe, PipeTransform } from '@angular/core';
import { MappingService } from '@services/mapping.service';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  constructor(private mappingService: MappingService) {
  }

  transform(value: any, mapFunction: ((value: any) => string) | string): any {
    if (mapFunction) {
      if (typeof mapFunction === 'function')
        return mapFunction(value);
      if (mapFunction in this.mappingService)
        return this.mappingService.getMethod(mapFunction)(value);
      else return new Error(`Brak zdefiniowanej funkcji o nazwie ${mapFunction} w MappingService`);
    }
    return value;
  }
}
