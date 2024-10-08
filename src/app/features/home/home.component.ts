import { Component, Injector, ViewChild } from '@angular/core';
import { PoPageSlideComponent, PoSlideItem } from '@po-ui/ng-components';
import { AppComponent } from 'src/app/app.component';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase {
  @ViewChild('pageSlide')
  pageSlide!: PoPageSlideComponent;

  appComponent!: AppComponent;

  imagesHome = [{url: '/assets/img1.jpg'},{url: '/assets/img2.jpg'},{url: 'assets/img3.jpg'}];

  override onReceiveLiterals(): void {
  }

  titleDetailsModal!: string;

  itemSelected!: any;

  itens!: Product[];
  filteredItens!: Product[];
  category!: any;

  cartItens!: any[];

  landscapes: Array<any> = [
    { imagem: '/assets/img1.jpg', description: 'COMPRE AS ULTIMAS PEÇAS' },
    { imagem: '/assets/img2.jpeg'},
    { imagem: '/assets/img3.jpg', description: 'Tudo para você ficar na moda' }
  ];

  constructor(private productService: ProductsService,
              private cartService: CartService,
              public override injector: Injector,
              public loginService: LoginService){
    super(injector);
    this.productService.getProducts().subscribe((item) => {
      this.itens = item;
      this.filteredItens = this.itens;
      const set = new Set()
      this.category = new Set(this.itens.map((x => x.category)));
    });

    this.appComponent = injector.get(AppComponent);

    this.cartService.getCart()?.subscribe((cart: Product[]) =>{
      this.context.cart.products = this.itens.filter(x => cart.map(y => y.id).includes(x.id));
      this.appComponent.changeIcon();
    });
  }

  handleCategory(categorySeleced: any){
    if(categorySeleced == 'all')
      this.filteredItens = this.itens;
    else
      this.filteredItens = this.itens.filter(x => x.category == categorySeleced);
  }

  showDetailPage(itemId: number) {
    this.router.navigate([`details/${itemId}`]);
  }
}

