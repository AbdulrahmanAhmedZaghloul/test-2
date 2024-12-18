import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import iconimage from '../../assets/image/black.png';
import { Helmet } from 'react-helmet-async';
import RecentProduct from '../../components/RecentProduct/RecentProduct';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails() {
    const location = useLocation();
    const { t } = useTranslation();
    const id = useParams();
    const [mainImage, setMainImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const product = location.state?.product; // التأكد من وجود المنتج قبل الوصول إلى خصائصه

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                className={`${product?.images?.length === 0 ? 'hidden' : 'flex justify-center fa-solid fa-chevron-down text-pink-600 text-4xl font-semibold cursor-pointer z-10'}`}
                onClick={onClick}
            >
            </div>
        );
    };
    
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <i
                className={`${product?.images?.length === 0 ? 'hidden' : 'flex justify-center fa-solid fa-chevron-up text-pink-600 text-4xl font-semibold cursor-pointer z-10'}`}
                onClick={onClick}
            >
            </i>
        );
    };
    
    CustomNextArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };
    
    CustomPrevArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        arrows: true, // تفعيل الأسهم
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error(`${t("cart.errorSize")}`, { autoClose: 3000 });
            return;
        };
        const sizeDetails = product.stock.find((s) => s.size === selectedSize);
        if (!sizeDetails) {
            toast.error(`${t("cart.errorSize")}`, { autoClose: 3000 });
            return;
        };
        if (quantity < 1) {
            toast.error(`${t("cart.errorSizee")}`, { autoClose: 3000 });
            return;
        };
        const newCartItem = {
            product_id: product.id,
            size_id: sizeDetails?.size_id,
            name: product.category_name,
            imag: product.imag,
            quantity: Number(quantity),
            size: selectedSize,
            price: sizeDetails.price,
            total_price: sizeDetails.price * Number(quantity),
        };
        addToCart(newCartItem);
        toast.success(`${t("cart.success")}`, { autoClose: 3000 });
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Product Details</title>
                <link rel="icon" href={iconimage} />
            </Helmet>
            <div className="p-5 pt-28 my-24">
                <div className="flex flex-wrap justify-between items-center gap-8">
                    <div className="w-full xl:w-[48%] lg:w-[60%] md:w-[80%] mx-auto flex flex-col items-center">
                        <div className="flex flex-wrap justify-center items-center">
                            <div className='w-[30%] p-2 flex justify-center items-center flex-col relative'>
                                {product ? (
                                    <Slider {...settings}>
                                        {product.images.map((imgs, index) => (
                                            <img
                                                key={index}
                                                src={imgs.url}
                                                alt={`Thumbnail ${index}`}
                                                className={`w-28 h-28 object-contain cursor-pointer my-1 ${mainImage === imgs.url ? 'border-pink-500' : 'border-gray-300'}`}
                                                onClick={() => setMainImage(imgs.url)}
                                            />
                                        ))}
                                    </Slider>
                                ) : null}
                            </div>
                            <div className='w-[70%] flex justify-center items-center'>
                                {product ? (
                                    <img
                                        className="w-80 mx-auto object-contain mb-6"
                                        src={mainImage || product.imag}
                                        alt={product?.category_name}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="w-full xl:w-[48%] lg:w-[60%] md:w-[80%] mx-auto p-5">
                        {product ? (
                            <>
                                <p className="tracking-[3px] text-gray-500 text-3xl md:text-4xl mt-6 mb-5 font-medium text-center md:text-left">
                                    {product?.category_name}
                                </p>
                                <span className="text-pink-500 text-lg md:text-xl font-semibold block mb-4 text-center md:text-left">
                                    LE {product?.price}
                                </span>
                                <div className="mb-6">
                                    <label className="block text-pink-500 text-lg font-semibold mb-3">
                                        size
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {product?.stock.map((size) => (
                                            <button
                                                key={size?.size_id}
                                                onClick={() => setSelectedSize(size.size)}
                                                className={`px-4 py-2 rounded-md border transition-colors ${selectedSize === size.size
                                                    ? 'bg-pink-600 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300 text-pink-500'
                                                    }`}
                                            >
                                                {size.size} / LE {size.price}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-lg text-gray-700 font-semibold mb-3">
                                        quantity
                                    </label>
                                    <div className="flex items-center border border-pink-300 w-fit mx-auto md:mx-0">
                                        <button
                                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                            className="px-4 py-2 text-pink-500"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
                                            className="w-16 text-pink-500 text-center border-none outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity((prev) => prev + 1)}
                                            className="px-4 py-2 text-pink-500"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center md:justify-start">
                                    <button
                                        onClick={handleAddToCart}
                                        className='border border-pink-500 hover:border-none mx-2 shadow-sm my-4 p-1 py-2 px-3 w-full hover:bg-[#242323] hover:text-pink-500 -skew-x-[25deg] hover:-skew-x-[5deg] transition-transform'
                                    >
                                        {t("productId.add")}
                                    </button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                <ToastContainer position="bottom-right" reverseOrder={false} />
            </div>
            <RecentProduct id={id?.product} />
        </React.Fragment>
    );
}

export default ProductDetails;
