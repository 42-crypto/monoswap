import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@/components/layout';
import { fetcher } from '@/fetch/fetcher';

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/orders/${id}`, fetcher);

  return (
    <Layout>
      <p>Order: {id}</p>
      {error && (
        <>
          <div>Failed to load</div>
        </>
      )}
      {!error && !data && (
        <>
          <div>Loading...</div>
        </>
      )}
      {data && (
        <>
          <p>Order Data is available!</p>
          <p className='text-xs'>{JSON.stringify(data.order)}</p>
        </>
      )}
    </Layout>
  );
};

export default OrderPage;
