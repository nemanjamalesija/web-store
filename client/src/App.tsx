import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState<any>();
  const fetchAllProducts = async () => {
    const sir = await fetch('http://127.0.0.1:3001/api/v1/products');

    const {
      data: { products },
    } = await sir.json();

    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

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
}

export default App;
