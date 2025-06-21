
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard";

export default function ProductPage() {

    // store the products in a state
    const [products, setProducts] = useState([]);

    useEffect( () => {

        const fetchProducts = async () => {
           const response =  await axios.get('products.json');
           setProducts(response.data);
           
        }
        fetchProducts();


    }, []); // <-- empty array means run once when the component is mounted (aka, rendered for the first time)


    const renderProducts = () => {
        const productJSX = [];
        for(let p of products) {
            productJSX.push(<div key={p.id} className="col-md-4 mb-4">
                <ProductCard
                    imageUrl={p.image}
                    price={p.price}
                    name={p.name}
                />
            </div>)
        }
        return productJSX;
    }

    return (<>
        <div className="container mt-5">
            <h1>Our Products</h1>
            <div className="row">
            {renderProducts()}
            </div>
        </div>
    </>)
}