import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import iconimage from '../../assets/image/black.png'
import noimage from '../../assets/8062132.webp'

function AllProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://backend.urbann9.com/api/product/getAll/${id}`);
                if (response.data.status === 'success') {
                    setProducts(response.data.data);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id]);
    if (error) return <p>Error: {error}</p>;
    return (
        <React.Fragment>
            <Helmet>
                <title>AllProducts</title>
                <link rel="icon" href={iconimage} />
            </Helmet>
            {loading ? <Loading /> : (<>
                <section className="my-16 mt-44 py-10">
                    <div className="flex flex-wrap justify-center items-center">
                        {products.length > 0 ?
                            products.map((product) => (
                                <div
                                    key={product?.id}
                                    className="xl:w-[25%] lg:w-[30%] md:w-[50%] w-[80%] p-5"
                                >
                                    <Link
                                        to={`/product/${product.id}/${id}`}
                                        state={{ product }}
                                    >
                                        <div className="relative group m-3 overflow-hidden">

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
                                        <div className="px-2 mt-2">
                                            <p className="text-gray-600 break-words whitespace-normal text-base mx-auto text-center tracking-widest">
                                                {product.details}
                                            </p>
                                            <div className="flex justify-center mt-4 mx-auto text-center flex-col">
                                                <p className="text-center text-gray-800 text-base font-normal">
                                                    {product?.name}
                                                </p>
                                                <span className="text-gray-800 text-base tracking-widest">
                                                    LE {product?.price}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                            :

                            (
                                <img src={noimage} alt="" />
                            )
                        }

                    </div>
                </section>
            </>
            )}
        </React.Fragment>
    );
}
export default AllProducts;