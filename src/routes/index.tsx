import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Layout } from '../components/ui/Layout';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';

const IndexPageContent = () => {
  const { data } = useProducts();

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <h1>Featured Products</h1>

        {data && (
          <ProductGrid>
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        )}
      </Layout.Main>
    </Layout>
  );
};

const IndexPage = () => {
  return (
    <Suspense fallback={<Layout><Layout.Main><p>Loading products...</p></Layout.Main></Layout>}>
      <IndexPageContent />
    </Suspense>
  );
};

export const Route = createFileRoute('/')({
  component: IndexPage,
});
