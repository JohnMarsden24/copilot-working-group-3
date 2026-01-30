import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { Layout } from '../../components/ui/Layout';
import { Header } from '../../components/Header';
import { ProductDetail } from '../../components/ProductDetail';

const ProductPageContent = () => {
  useProduct();

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <ProductDetail />
      </Layout.Main>
    </Layout>
  );
};

const ProductPage = () => {
  return (
    <Suspense fallback={<Layout><Layout.Main><p>Loading product...</p></Layout.Main></Layout>}>
      <ProductPageContent />
    </Suspense>
  );
};

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
});
