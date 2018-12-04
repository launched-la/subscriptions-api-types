declare namespace Shopify {
  interface Variant {
    id: number,
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
}