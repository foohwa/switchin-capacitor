export class Deals {
  constructor(
    public id: string,
    public recommended: boolean,
    public favourite: boolean,
    public category: string,
    public title: string,
    public merchant: string,
    public description: string,
    public discountedPrice: string,
    public originalPrice: string,
    public views: string
  ) {}
}
