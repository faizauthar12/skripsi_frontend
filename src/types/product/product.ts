export interface ProductItem {
  UUID: string;
  UserUUID: string;
  UserName: string;
  ProductName: string;
  ProductPic: string;
  ProductDescription: string;
  ProductCategory: string;
  ProductPrice: number;
  ProductStock: number;
}

export interface ProductResponseBody {
  products: ProductItem[];
}
