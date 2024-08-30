import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchProducts } from "./store/productSlice";

function App() {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);
  
  return (
    <>
      <div>App will be here</div>
      {products.map((product)=>(

        <div key={product.id}>
        <div key={product.id}>{product.id}</div>
        <div key={product.id}>{product.description}</div>
        </div>
      ))}
    </>
  );
}

export default App;
