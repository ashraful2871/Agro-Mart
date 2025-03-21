import React, { useEffect, useState } from 'react';
import ProductCart from '../../components/Products/ProductCart';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Products = () => {
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    useEffect(() => {
        axiosPublic.get(`/products`)
            .then((res) => {
                setProducts(res.data)
            })
    }, [])


    return (
        <div>
            
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {
                    products.map(product => <ProductCart key={product._id} product={product}></ProductCart>)
                }
            </div>
        </div>
    );
};

export default Products;