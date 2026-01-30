import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Header } from '../../components/Header';
import { ProductDetail } from '../../components/ProductDetail';

const ProductPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <Suspense fallback={<p>Loading product...</p>}>
          <ProductDetail />
        </Suspense>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
});
