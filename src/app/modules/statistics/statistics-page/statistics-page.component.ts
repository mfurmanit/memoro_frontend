import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StatisticsService } from '@services/statistics.service';
import { BaseComponent } from '@components/base/base.component';
import { BaseChartDirective } from 'ng2-charts';
import { DateRange } from '@models/date-range';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardCollection } from '@models/card-collection';
import { auditTime, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CardCollectionService } from '@services/card-collection.service';
import { HttpParams } from '@angular/common/http';
import { formatDateForBackend, getSortedData, isNonNullable, isNullOrUndefined } from '@others/helper-functions';
import { ChartsConfig } from '@models/charts-config';
import { chartColors, chartsConfig, lineChartColors } from '@others/charts';
import { StatisticsResponse } from '@models/statistics-response';
import { dateRangeValidator } from '@others/validators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild('inputsContainer', {read: ElementRef}) inputsContainer: ElementRef | undefined;
  @ViewChild('chartsContainer') chartsContainer: ElementRef | undefined;

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  form = new FormGroup({
    from: new FormControl<Date>(new Date(), Validators.required),
    to: new FormControl<Date>(new Date(), Validators.required),
    collection: new FormControl<CardCollection | null>(null)
  }, {validators: dateRangeValidator});

  public chartsConfig: ChartsConfig = chartsConfig;

  constructor(private service: StatisticsService,
              private collectionService: CardCollectionService) {
    super();
  }

  ngOnInit(): void {
    this.getCollections = this.getCollections.bind(this);
    this.initListeners();
  }

  ngAfterViewInit() {
    this.adjustChartContainerHeight();
    window.addEventListener('resize', this.adjustChartContainerHeight.bind(this));
  }

  adjustChartContainerHeight() {
    if (!isNullOrUndefined(this.inputsContainer) && !isNullOrUndefined(this.chartsContainer)) {
      const inputsHeight = this.inputsContainer.nativeElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      this.chartsContainer.nativeElement.style.height = `calc(${viewportHeight - inputsHeight - 64}px - 2rem)`;
      // 64px is the size of navbar, 2rem is padding
    }
  }

  getCollections(value: string): Observable<CardCollection[]> {
    return this.collectionService.getAll(this.prepareParams(value)).pipe(map(value => value.content));
  }

  prepareParams(search: string): HttpParams {
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20');

    if (!isNullOrUndefined(search)) params = params.append('value', search);

    return params;
  }

  reloadCharts(range: DateRange, collectionId?: string): void {
    this.subscriptions.add(
      this.service.getData(range, collectionId).subscribe(response => {
        this.prepareBarData(response);
        this.prepareLineData(response);
        this.preparePieData(response);
        this.charts?.forEach(chart => chart.update());
      })
    );
  }

  private prepareBarData(response: StatisticsResponse): void {
    const {labels, data} = getSortedData(response.viewedCards);

    this.chartsConfig['bar'].data = {
      labels,
      datasets: [
        {
          data,
          ...chartColors
        }
      ]
    };
  }

  private prepareLineData(response: StatisticsResponse): void {
    const {labels, data} = getSortedData(response.reviewedCards);

    this.chartsConfig['line'].data = {
      labels: labels,
      datasets: [
        {
          data, ...lineChartColors
        }
      ]
    };
  }

  private preparePieData(response: StatisticsResponse): void {
    const {labels, data} = getSortedData(response.reviewTimes);

    this.chartsConfig['pie'].data = {
      labels,
      datasets: [{data}]
    };
  }

  private initListeners(): void {
    if (!isNullOrUndefined(this.form))
      this.subscriptions.add(
        this.form.valueChanges.pipe(
          auditTime(0),
          filter(({from, to}) => isNonNullable(from) && isNonNullable(to) && this.form.valid),
        ).subscribe(({from, to, collection}) =>
          this.reloadCharts({from: formatDateForBackend(from!), to: formatDateForBackend(to!)}, collection?.id)
        )
      );

    this.form.updateValueAndValidity();
  }
}

