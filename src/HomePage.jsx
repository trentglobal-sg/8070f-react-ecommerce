import Header from "./Header";
import ProductCard from "./ProductCard";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function HomePage() {


    const [featuredProducts, setFeaturedProducts] = useState([]);

    // useEffect: an effect in React is a logic not related to rendering the DOM
    // first parameter of useEffect is a 'effect' function
    // second parameter is a dependency array - usually contains a state. When the state changes, the
    // 'effect' function will run again.
    //  - If the dependency array is empty, it means the effect will only run when the component renders
    //    for the first time (aka. mounting)
    useEffect(function () {



        // make an axios call to featured.json (looks for JSON file in the public folder)
        // the effect function cannot be aysnc 
        const getFeaturedProducts = async () => {
            const response = await axios.get('featured.json');
            setFeaturedProducts(response.data);  // <-- cause a re-render
        }
        getFeaturedProducts();

    }, [])


    return (<>
        <Header />

        <main className="container my-5">
            <h2 className="text-center mb-4">Featured Products</h2>
            <div className="row">
                
            {
                featuredProducts.map(p=>
                <div className="col-md-3 mb-4">
                    <ProductCard
                        imageUrl={p.image}
                        productName={p.name}
                        price={p.price}
                    />
                </div>
                )
            }
             
            </div>
        </main>

    </>);
}