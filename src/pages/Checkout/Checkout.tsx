import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./checkout.scss";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{11,}$/, "Phone number must be at least 11 digits"),
});

const Checkout: React.FC = () => {
  const context = useContext(ShopContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    getTotalCartAmount,
    cartItems,
    productData,
    getDefaultCart,
    setCartItems,
  } = context;

  const cartProducts =
    productData?.filter((product) => cartItems[product.id] > 0) || [];

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
    additionalInfo: "",
  };

  const handlePlaceOrder = (values: any) => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (values.phone.replace(/\D/g, "").length < 11) {
      toast.error("Invalid phone number");
      return;
    }

    notify();
    setCartItems(getDefaultCart());
    navigate("/");
  };

  const notify = () => toast.success("Order Placed Successfully");

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="billDetails">Billing Details</h1>
      <div className="">
        <div className="billingPage">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlePlaceOrder}
          >
            {({ isSubmitting, setFieldValue }) => (
              <>
                <Form className="billingForm">
                  <div className="billingFormFlex">
                    <div className="names">
                      <label htmlFor="firstName" className="labels">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        className="inputs nameInput"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="names">
                      <label htmlFor="lastName" className="labels">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        className="inputs nameInput"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <label htmlFor="companyName" className="labels">
                    Company Name (Optional)
                  </label>
                  <Field type="text" name="companyName" className="inputs" />
                  <label htmlFor="companyName" className="labels">
                    Country/Region
                  </label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    className="countryInput"
                    onChange={(selectedOption) =>
                      setSelectedCountry(selectedOption)
                    }
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="streetAddress" className="labels">
                    Street Address
                  </label>
                  <Field type="text" name="streetAddress" className="inputs" />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="city" className="labels">
                    Town / City
                  </label>
                  <Field type="text" name="city" className="inputs" />
                  <ErrorMessage name="city" component="div" className="error" />
                  <label htmlFor="zipCode" className="labels">
                    Zip Code
                  </label>
                  <Field type="text" name="zipCode" className="inputs" />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="phone" className="labels">
                    Phone
                  </label>
                  <PhoneInput
                    country={"ng"}
                    value={initialValues.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    inputClass="inputs"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="email" className="labels">
                    Email address
                  </label>
                  <Field type="email" name="email" className="inputs" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                  <Field
                    className="inputs"
                    type="text"
                    name="additionalInfo"
                    id="info"
                    placeholder="Additional Information"
                  />
                </Form>
                <Form>
                  <div className="checkoutTotalDiv">
                    <div className="checkoutTotal">
                      <div className="checkoutHeaderText">
                        <h3 className="checkoutProductText">Product</h3>
                        <h3 className="checkoutProductText">Subtotal</h3>
                      </div>

                      {cartProducts.map((product) => (
                        <div
                          key={product.id}
                          className="checkoutProductTextDiv"
                        >
                          <p className="transferText">
                            {product.title} x {cartItems[product.id]}
                          </p>

                          <p className="transferText2">
                            Rs{" "}
                            {(product.price * cartItems[product.id]).toFixed(2)}
                          </p>
                        </div>
                      ))}

                      <div>
                        <div className="checkoutSubtotal">
                          <p className="checkoutProductText">Subtotal</p>
                          <p>Rs {getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <div className="checkoutTotals">
                          <h3>Total</h3>
                          <p className="cartTotalAmt">
                            Rs {getTotalCartAmount().toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <h3 className="checkoutProductText">
                      Direct Bank Transfer
                    </h3>
                    <p className="transferText">
                      Make your payment directly into our bank account. Please
                      use your order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                    <div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="directBankTransfer"
                        value="Direct Bank Transfer"
                        defaultChecked
                      />
                      <label
                        htmlFor="directBankTransfer"
                        className="transferText"
                      >
                        Direct Bank Transfer
                      </label>
                      <br />
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        value="Cash On Delivery"
                      />

                      <label htmlFor="cashOnDelivery" className="transferText">
                        Cash on Delivery
                      </label>

                      <p className="checkoutText">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        <b> privacy policy.</b>
                      </p>
                      <div className="orderDiv">
                        <button
                          className="orderBtn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Checkout;
