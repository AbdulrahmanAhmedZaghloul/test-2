import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import PropTypes from 'prop-types';

function RecentProduct({ id }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`https://backend.urbann9.com/api/product/getAll/${id}`);
                if (response?.data?.status === 'success') {
                    setProducts(response?.data?.data);
                } else {
                    throw new Error('Failed to fetch categories');
                }
            } catch (error) {
                setError(error.message);
            }
        };
        setLoading(false);
        fetchCategories();
    }, [id]);

    if (error) return <p>Error: {error}</p>;

    return (
        <React.Fragment>
            {loading ? <Loading /> : (<>
                <div className="flex flex-wrap justify-center items-center mb-40">
                    {products?.map((product) => (
                        <div
                            key={product?.id}
                            className="xl:w-[25%] lg:w-[30%] md:w-[50%] w-[80%] p-5"
                        >
                            <Link className='' to={`/product/${product.id}/${id}`} state={{ product }}>
                                <div className="relative border group m-3 overflow-hidden">
                                    <img
                                        className="w-full object-contain"
                                        src={product?.imag}
                                        alt={product?.category_name}
                                    />
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                        {product.images?.slice(0, 1).map((imgs) => (

                                            <div key={imgs.url} className="flex object-contain bg-white w-full justify-center items-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <img

                                                    className="w-full object-contain mx-2"
                                                    src={imgs.url}
                                                    alt={product?.category_name}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                    <div className="absolute inset-x-0 top-100 group-hover:top-0 flex flex-wrap justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                                        {product.stock.map((size) => (
                                            <span
                                                key={size.size_id}
                                                className="bg-white  w-fit text-gray-800 px-4 py-2 m-2 rounded-md shadow-lg hover:bg-gray-200 transition-all"
                                            >
                                                size :: {size.size}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-2 mt-2 ">
                                    <div className="flex justify-between mt-4 mx-auto text-center">
                                        <p className="text-center text-gray-800 text-base font-normal">
                                            {product?.category_name}
                                        </p>
                                        <span className="text-gray-800 text-base tracking-widest">
                                            LE {product?.price}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 break-words whitespace-normal text-base mx-auto mt-3 tracking-[2.7px]">
                                        {product.details}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </>
            )}
        </React.Fragment>
    );
}
RecentProduct.propTypes = {
    id: PropTypes.string.isRequired,
};

export default RecentProduct;
