import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../constants/baseURL';
import { useGetGlobalInfo } from '../hooks/useGetGlobalInfo';

const Products = () => {
  const { user } = useGetGlobalInfo();

  useEffect(() => {
    if (!user.token) return;

    const fetchAllProducts = async () => {
      try {
        const response = await axios(
          `${baseURL}/products`,

          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        const { data } = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, [user.token]);

  return (
    <div>
      {/* {products.map((prod: any, i) => {
        console.log(prod.image);

        return (
          <img
            key={i}
            src={`http://127.0.0.1:3001/public/images${prod.image}`}
          />
        );
      })}{' '} */}
    </div>
  );
};

export default Products;
