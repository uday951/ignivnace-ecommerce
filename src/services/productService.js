import api from './api';
import { dummyProducts } from './dummyData'; 

const normalizeProduct = (p) => ({
  ...p,
  id: p._id // Map MongoDB internal id for seamless React component compatibility
});

export const getProducts = async () => {
  try {
    const res = await api.get('/products');
    if(res.data && res.data.success) {
      return res.data.data.products.map(normalizeProduct);
    }
    return res.data;
  } catch (error) {
    console.warn("Backend missing, failing back to local data...", error);
    return dummyProducts;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    if(res.data && res.data.success) {
      return normalizeProduct(res.data.data);
    }
  } catch (error) {
    console.warn("Product specific backend fetch missing:", error);
    return dummyProducts.find(p => p.id === id);
  }
};
