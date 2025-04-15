import { useCartStore } from "@/app/store/cartStore";
import { Product } from "@/app/utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import ProductGallery from "@/app/components/product/ProductGallery";
import RatingStars from "@/app/components/product/RatingStars";
import { getAllProducts, getProductById } from "@/app/services/productService";

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  const add = useCartStore((s) => s.addToCart);
  const toggleWish = useCartStore((s) => s.toggleWishlist);
  const wished = useCartStore((s) =>
    s.wishlist.some((w: any) => w.id === product.id)
  );
  const [qty, setQty] = useState(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <ProductGallery images={[product.image]} />
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <RatingStars rate={product.rating.rate} />
        <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="mt-6 text-sm">{product.description}</p>

        <div className="flex items-center gap-2 mt-6">
          <label className="text-sm">Qty</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            className="w-16 input text-center"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button className="btn flex-1" onClick={() => add(product, qty)}>
            Add to Cart
          </button>
          <button className="btn flex-1" onClick={() => toggleWish(product)}>
            {wished ? "Remove Wish" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Static paths for product pages */
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  return {
    paths: products.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: "blocking",
  };
};

/* Static props for individual product */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await getProductById(Number(params!.id));
  return { props: { product }, revalidate: 60 };
};
