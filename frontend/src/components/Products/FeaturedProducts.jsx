import { Link } from 'react-router-dom';
import featured from '../Products/assets/featured.webp';

const FeaturedProducts = () => {
    return (
        <section className="py-16 px-4 lg:px-0"> 
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
                <div className="lg:w-1/2 p-8 text-center lg:text-left">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Comfort Meets Style
                    </h2>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Effortless Fashion for Daily Living
                    </h2>
                    <p className="text-md text-gray-500">
                        Elevate your wardrobe with versatile pieces that feel as good as they look. Experience the perfect balance of comfort, quality, and timeless design.
                    </p>
                    <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-large hover:bg-gray-800 mt-5 inline-block">
                        Shop Now
                    </Link>
                </div>

                <div className='lg:w-1/2'>
                    <img src={featured} alt='Featured Collection' className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'/>
                </div>
            </div>
        </section>
    );
}

export default FeaturedProducts;