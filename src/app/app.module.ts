import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookListItemComponent} from './book-list-item/book-list-item.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookStoreService} from "./shared/service/book-store.service";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookFormComponent} from './book-form/book-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from './search/search.component';
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {LoginComponent} from './login/login.component';
import {AuthService} from "./shared/service/authentication.service";
import {TokenInterceptorService} from "./shared/service/token-interceptor.service";
import {JwtInterceptorService} from "./shared/service/jwt-interceptor.service";
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import {OrderService} from "./shared/service/order.service";
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import {CurrencyPipe} from "./shared/pipe/currency-pipe";
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyPipe,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent,
    LoginComponent,
    ShoppingBasketComponent,
    AddToCartComponent,
    CheckoutComponent,
    UserOrdersComponent,
    DeliveryAddressComponent,
    OrderOverviewComponent,
    AllOrdersComponent,
    OrderDetailsComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DateValueAccessorModule
  ],
  providers: [
    BookStoreService,
    OrderService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
