export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
}

export const PRODUCTS: Product[] = [
  // Laptops
  { id: 1, title: "Apple MacBook Pro 14 Inch", price: 1999.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp", rating: 4.9, reviews: 341 },
  { id: 2, title: "Asus Zenbook Pro Dual Screen", price: 1799.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp", rating: 4.7, reviews: 156 },
  { id: 3, title: "Huawei Matebook X Pro", price: 1299.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp", rating: 4.6, reviews: 89 },
  { id: 4, title: "Lenovo Yoga 920", price: 1099.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp", rating: 4.8, reviews: 412 },
  { id: 34, title: "New DELL XPS 13 9300", price: 899.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp", rating: 4.5, reviews: 210 },
  { id: 48, title: "Microsoft Surface Laptop 4", price: 1499.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp", rating: 4.7, reviews: 320 },
  { id: 49, title: "Acer Swift 3", price: 699.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp", rating: 4.3, reviews: 140 },
  { id: 50, title: "HP Envy x360", price: 849.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp", rating: 4.5, reviews: 220 },
  
  // Smartphones
  { id: 5, title: "iPhone 13 Pro Max", price: 1099.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp", rating: 4.8, reviews: 890 },
  { id: 6, title: "iPhone X", price: 899.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp", rating: 4.5, reviews: 230 },
  { id: 7, title: "Samsung Galaxy S10", price: 699.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp", rating: 4.6, reviews: 520 },
  { id: 8, title: "Samsung Galaxy S8", price: 499.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp", rating: 4.4, reviews: 356 },
  { id: 35, title: "Realme XT", price: 349.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp", rating: 4.2, reviews: 120 },
  { id: 36, title: "Vivo X21", price: 499.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp", rating: 4.3, reviews: 327 },
  { id: 51, title: "Google Pixel 8 Pro", price: 999.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp", rating: 4.7, reviews: 500 },
  { id: 52, title: "OnePlus 12 5G", price: 799.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp", rating: 4.6, reviews: 280 },
  
  // Fashion
  { id: 9, title: "Luxury Minimalist White T-Shirt", price: 95.00, category: "Fashion", image: "/premium_shirt.png", rating: 4.9, reviews: 120 },
  { id: 10, title: "Noir Leather Bomber Jacket", price: 450.00, category: "Fashion", image: "/premium_jacket.png", rating: 5.0, reviews: 84 },
  { id: 21, title: "Crimson Boost 350 Sneakers", price: 220.00, category: "Fashion", image: "/prod_red.png", rating: 4.7, reviews: 312 },
  { id: 22, title: "Ocean Pulse V2 Sneakers", price: 195.00, category: "Fashion", image: "/prod_blue.png", rating: 4.6, reviews: 189 },
  { id: 23, title: "Neon Cyber Runner", price: 250.00, category: "Fashion", image: "/prod_yellow.png", rating: 4.8, reviews: 45 },
  { id: 37, title: "Nike Air Jordan 1 Red", price: 149.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp", rating: 4.7, reviews: 443 },
  { id: 38, title: "Puma Future Rider Trainers", price: 89.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp", rating: 4.9, reviews: 71 },
  { id: 39, title: "Marni Red & Black Suit", price: 179.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/thumbnail.webp", rating: 4.4, reviews: 345 },
  { id: 40, title: "Black Women's Gown", price: 129.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp", rating: 4.6, reviews: 87 },
  { id: 41, title: "Calvin Klein Heel Shoes", price: 79.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp", rating: 4.9, reviews: 74 },
  { id: 53, title: "Gucci Print Sweatshirt", price: 590.00, category: "Fashion", image: "/premium_shirt.png", rating: 4.8, reviews: 125 },
  { id: 54, title: "Prada Nylon Backpack", price: 1550.00, category: "Fashion", image: "/premium_bag.png", rating: 4.9, reviews: 60 },
  
  // Accessories & Watches
  { id: 11, title: "Designer Leather Handbag", price: 890.00, category: "Accessories", image: "/premium_bag.png", rating: 4.8, reviews: 210 },
  { id: 12, title: "Longines Master Collection", price: 1450.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp", rating: 4.9, reviews: 45 },
  { id: 42, title: "Rolex Submariner Watch", price: 13999.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp", rating: 5.0, reviews: 471 },
  { id: 43, title: "Rolex Datejust", price: 10999.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp", rating: 4.8, reviews: 457 },
  { id: 44, title: "Brown Leather Belt Watch", price: 89.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp", rating: 4.1, reviews: 150 },
  { id: 55, title: "Silver Aviator Sunglasses", price: 120.00, category: "Accessories", image: "https://cdn.dummyjson.com/product-images/sunglasses/silver-aviator-sunglasses/thumbnail.webp", rating: 4.5, reviews: 210 },
  { id: 56, title: "Gold Chain Necklace", price: 299.00, category: "Accessories", image: "https://cdn.dummyjson.com/product-images/womens-jewellery/gold-chain-necklace/thumbnail.webp", rating: 4.6, reviews: 88 },
  
  // Fragrances
  { id: 13, title: "Chanel Coco Noir", price: 129.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp", rating: 4.9, reviews: 210 },
  { id: 14, title: "Dior J'adore", price: 89.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp", rating: 4.8, reviews: 300 },
  { id: 45, title: "Gucci Bloom Eau de", price: 115.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp", rating: 4.7, reviews: 231 },
  { id: 46, title: "Calvin Klein CK One", price: 45.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp", rating: 4.4, reviews: 541 },
  { id: 57, title: "Versace Eros", price: 95.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/versace-eros/thumbnail.webp", rating: 4.8, reviews: 600 },
  { id: 58, title: "Tom Ford Black Orchid", price: 150.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp", rating: 4.9, reviews: 145 },

  // Furniture
  { id: 17, title: "Annibale Colombo Bed", price: 1899.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp", rating: 4.7, reviews: 56 },
  { id: 18, title: "Annibale Colombo Sofa", price: 2499.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp", rating: 4.9, reviews: 42 },
  { id: 59, title: "Modern Oak Dining Table", price: 799.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/modern-oak-dining-table/thumbnail.webp", rating: 4.5, reviews: 120 },
  { id: 60, title: "Ergonomic Office Chair", price: 299.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/ergonomic-office-chair/thumbnail.webp", rating: 4.6, reviews: 850 }
];
