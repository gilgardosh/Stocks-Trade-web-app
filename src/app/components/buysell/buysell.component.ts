import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForm } from './buysell-form/buysell-form.component';
import { StocksListService } from 'src/app/services/stockslist.service';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'pm-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent implements OnInit, OnDestroy {
  public pageTitle = 'Buy and Sell Stocks';
  private subscription = new Subscription();
  public stockSymbol: string;
  errorMessage = '';
  listHasLoaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private stocksListService: StocksListService
  ) {}

  ngOnInit() {
    this.initStocksList$();
    this.initParam$();
    // this.isAuthorized$();
  }

  // isAuthorized$() {
  //   const auth$ = this.authService.isNotAuthorized
  //     .pipe(filter(authStatus => authStatus))
  //     .subscribe(notAuth => {
  //       console.log('notAuth: ', notAuth);
  //     });
  //   this.subscription.add(auth$);
  // }

  onValueChanged(values: IForm) {
    console.log('value is here: ', values);
  }

  initStocksList$() {
    this.listHasLoaded = false;
    const param2$ = this.stocksListService.getStocksList().subscribe(list => {
      this.listHasLoaded = true;
      const isIncluded = !!this.stocksListService.stockList.find(
        stock => stock === this.stockSymbol
      );

      if (this.stockSymbol && !isIncluded) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
    this.subscription.add(param2$);
  }

  initParam$() {
    const param$ = this.route.paramMap.subscribe(param => {
      this.stockSymbol = param.get('stockSymbol');
    });
    this.subscription.add(param$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
