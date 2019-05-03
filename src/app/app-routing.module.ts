import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {UserOrdersComponent} from "./user-orders/user-orders.component";
import {AllOrdersComponent} from "./all-orders/all-orders.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/:isbn', component: BookDetailsComponent },
  { path: 'admin', component: BookFormComponent },
  { path: 'admin/:isbn', component: BookFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shoppingBasket', component: ShoppingBasketComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'myOrders', component: UserOrdersComponent},
  { path: 'orders', component: AllOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
