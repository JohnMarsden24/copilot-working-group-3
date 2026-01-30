import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { productService } from '../services';

export const useProduct = () => {
  const { productId } = useParams({ from: '/products/$productId' });
  const id = Number(productId);

  if (!id || isNaN(id)) {
    throw new Error('Invalid product ID');
  }

  return useSuspenseQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
  });
};
