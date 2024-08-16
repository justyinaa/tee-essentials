import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import staricon from "../../assets/staricon.png";
import halfstar from "../../assets/halfstar.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import { useDispatch } from "react-redux";
import { selectedProduct } from "../../redux/actions/productActions";
import { ShopContext } from "../../context/ShopContext";
import { HiChevronRight } from "react-icons/hi";
import "./products.scss";
import { BeatLoader } from "react-spinners";

const ProductDetail: React.FC = () => {
const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const context = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const data = await response.json();
        setProductData(data);
        dispatch(selectedProduct(data));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, dispatch]);

  if (!productData) {
    return <BeatLoader />;
  }



  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
    if (context) {
      context.addToCart(productData.id, quantity);
      setQuantity(1); 
    } else {
      console.error("ShopContext is not available");
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="homeLink">
        <Link to="/">
          Home{" "}
          <span className="chevronRight">
            <HiChevronRight />
          </span>
        </Link>
        <Link to="/shop" className="chevronBorder">
          Shop{" "}
          <span className="chevronRight">
            <HiChevronRight />
          </span>
        </Link>
        <p className="productPageTitle">{productData.title}</p>
      </div>
      <div className="sofaDescription">
        <div className="sofaCollections">
          {productData?.images?.map((image: string, id: number) => (
            <img
              key={id}
              src={image}
              alt={`productData ${id}`}
              className="outdoorSofa"
              onClick={() => handleImageClick(id)}
            />
          ))}
        </div>
        <div className="singleImage">
          <Carousel
            showArrows={false}
            selectedItem={currentSlide}
            onChange={(index) => setCurrentSlide(index)}
          >
            {productData?.images?.map((image: string, id: number) => (
              <div key={id} className="carouselImages">
                <img src={image} alt={`productData ${id}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="productDetails">
          <p className="productTitleHeader">{productData?.title}</p>
          <p className="productPrice">Rs {productData?.price.toFixed(2)}</p>
          <div className="starIcons">
            {Array.from(
              { length: Math.floor(productData?.rating) },
              (_, id) => (
                <img key={id} src={staricon} alt="Star" className="star" />
              )
            )}
            {productData?.rating % 1 !== 0 && (
              <img
                src={halfstar}
                alt="Half Star"
                id="halfstar"
                className="star"
              />
            )}
            <span className="custReview">
              {productData?.rating} Customer Reviews
            </span>
          </div>
          <p className="productDescription">{productData?.description}</p>
          <p className="productSize">Size</p>
          <div className="sizes">
            <button className="sizesBtn">L</button>
            <button className="sizesBtn">XL</button>
            <button className="sizesBtn">XS</button>
          </div>
          <p className="productColor">Color</p>
          <div className="colorsBtn">
            <button
              className="colorsBtn1"
              onClick={() => handleColorSelect("Purple")}
            ></button>
            <button
              className="colorsBtn2"
              onClick={() => handleColorSelect("Black")}
            ></button>
            <button
              className="colorsBtn3"
              onClick={() => handleColorSelect("Gold")}
            ></button>
          </div>
          {selectedColor && (
            <p className="selectedColorText">Selected Color: {selectedColor}</p>
          )}
          <div className="addCartItems">
            <div className="addItems">
              <button className="addItemsCount">
                <span onClick={handleDecrement}>-</span>
                <span>{quantity}</span>
                <span onClick={handleIncrement}>+</span>
              </button>
              <div>
                <div>
                  <button className="addToCartBtn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="productSKU">
              SKU <span>: {productData?.sku}</span>
            </p>
            <p className="productCategory">
              Category <span>: {productData?.category}</span>
            </p>
            <p className="socialIcons">
              Share :
              <span>
                <img src={facebook} alt="Facebook" className="socials" />
              </span>
              <span>
                <img src={linkedin} alt="LinkedIn" className="socials" />
              </span>
              <span>
                <img src={twitter} alt="Twitter" className="socials" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
