interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => (
  <div className="w-full">
    <img
      src={images[0]}
      alt="Product"
      className="w-full h-96 object-contain rounded-lg border"
    />
  </div>
);

export default ProductGallery;
