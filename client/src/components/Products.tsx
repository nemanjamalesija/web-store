import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

//127.0.0.1:3001/api/v1/products

const Products = () => {
  const [products, setProducts] = useState<any>();
  const { auth } = useAuth();

  console.log(auth);

  useEffect(() => {
    if (!auth.token) return;

    const fetchAllProducts = async () => {
      try {
        const response = await axios(
          'http://127.0.0.1:3001/api/v1/products',

          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const data = JSON.stringify(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, [auth.token]);

  if (!products) return <h1>Loading...</h1>;

  return (
    <div>
      {products.map((prod: any, i) => {
        console.log(prod.image);

        return (
          <img
            key={i}
            src={`http://127.0.0.1:3001/public/images${prod.image}`}
          />
        );
      })}{' '}
    </div>
  );
};

export default Products;
