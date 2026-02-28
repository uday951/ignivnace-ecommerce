import ProductCard from './ProductCard';

const ProductGrid = ({ products, title }) => {
  return (
    <div className="py-6">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-900 px-4 sm:px-0">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
