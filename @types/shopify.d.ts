declare namespace Shopify {
  interface Cart {
    items: Item[],
  }

  interface GroupedItem {
    children: Item[],
    item: Item,
  }

  interface Item {
    id: number,
    key: string,
    price: number,
    properties?: {
      bundle_id?: string,
      parent_bundle_id?: string,
    },
    quantity: number,
    variant_options: string[],
    variant_title: string,
    title: string,
  }

  interface Product {
    id: number,
    title: string,
    body_html: string,
    vendor: string,
    product_type: string,
    created_at: string,
    handle: string,
    updated_at: string,
    published_at: string,
    template_suffix: string,
    tags: string,
    published_scope: string,
    admin_graphql_api_id: string,
    variants: Variant[],
    options: object[],
    images: ProductImage[],
    image: ProductImage,
  }

  interface ProductImage {
    id: number,
  }

  interface Variant {
    id: number,
  }
}