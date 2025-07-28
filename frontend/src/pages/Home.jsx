import { TbPlaceholder } from 'react-icons/tb';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection.jsx';
import NewArrivals from '../components/Products/NewArrivals.jsx';
import ProductDetails from '../components/Products/ProductDetails.jsx';
import ProductGrid from '../components/Products/ProductGrid.jsx';
import FeaturedProducts from '../components/Products/FeaturedProducts.jsx';
import FeaturesSection from '../components/Products/FeaturesSection.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { fetchProductsByFilters } from '../redux/slices/productsSlice.js';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProductsByFilters({
            gender: "Women",
            category : "Bottom Wear",
            limit: 8,
        }));

        const fetchBestSeller = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBestSeller();
    }, [dispatch]);

    return (
        <div>
           <Hero /> 
           <GenderCollectionSection />
           <NewArrivals />

           <h2 className='text-3xl text-center font-bold mb-4'>
            Best Seller
           </h2>
           {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
              <p className='text-center'>Loading best seller products ...</p>
           )}

           <div className='container mx-auto'>
            <h2 className='text-3xl text-center font-bold mb-4'>
                Top Wear for Women
            </h2>
            <ProductGrid products={products} loading={loading} error={error} />
           </div>

           <FeaturedProducts />
           <FeaturesSection />
        </div>
    ) 
}

export default Home;