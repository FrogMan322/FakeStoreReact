import classes from "./Home.module.css";
import React, { useCallback, useState, useEffect } from "react";
import Modal from "../Cart/Modal";
import ProductsContainer from "../Products/ProductsContainer";
import Products from "../Products/Products";
import Nav from "../Nav/Nav";

// Image Modal
import ImageBackdrop from "../ImageModal/ImageModal";

function HomePage() {
  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cartItem")) || []
  );
  // Image Modal
  const [showImgModal, setShowImageModal] = useState(false);
  const [imageValue, setImageValue] = useState("");

  // Modal value
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  // Rendering on screen
  const [curData, setCurData] = useState([]);
  // error handlig states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(false);
      setError(null);
      const endpoint = await fetch("https://fakestoreapi.com/products");
      if (!endpoint.ok) {
        throw new Error("FAILD TO LOAD PRODUCTS TRY LATER");
      }
      const data = await endpoint.json();
      setCurData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);
  function getFilterValue(value) {
    setFilterValue(value);
  }
  // Adding item from cart

  // Deleting items form cart
  function deleteItem(id) {
    const updateCart = cartItem.filter((el) => {
      return el.id !== id;
    });
    setCartItem(updateCart);
  }
  // Incrementing decrimenting quantity
  function incrementDecriment(id, action) {
    if (action === "incriment") {
      const updatedCart = cartItem.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItem(updatedCart);
    } else if (action === "decriment") {
      const updatedCart = cartItem.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCartItem(updatedCart);
      // Deletes element when the quantity reaches zero
      const findEl = cartItem.find((el) => {
        return el.id === id;
      });
      if (findEl.quantity < 2) {
        const updatedCart = cartItem.filter((el) => {
          return el.id !== id;
        });
        setCartItem(updatedCart);
      }
    }
  }
  // Geting image data for modal
  const getImage = async (id) => {
    const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await endpoint.json();

    setImageValue(data.image);
  };

  return (
    <div className={classes.container}>
      {showImgModal && (
        <ImageBackdrop
          imageValue={imageValue}
          setImageValue={setImageValue}
          showImage={setShowImageModal}
        />
      )}
      {
        <Modal
          setCartItem={setCartItem}
          incrementDecriment={incrementDecriment}
          clearCart={setCartItem}
          modalValue={modalValue}
          setModalValue={setModalValue}
          deleteItem={deleteItem}
          cartData={cartItem}
        />
      }
      <Nav
        setModalValue={setModalValue}
        onFilter={getFilterValue}
        onClose={setModalValue}
        cartQuantity={cartItem}
      />

      <ProductsContainer>
        {!isLoading && <h1 className={classes.loding}>Loading...</h1>}
        {isLoading &&
          curData.length > 0 &&
          curData // eslint-disable-next-line
            .filter((obj) => {
              const value = filterValue.toLowerCase();
              if (value === "") {
                return obj;
              } else if (
                obj.title.toLowerCase().includes(value) ||
                obj.category.toLowerCase().includes(value) ||
                obj.description.toLowerCase().includes(value)
              ) {
                return obj;
              }
            })
            .map((obj) => {
              return (
                <Products
                  setShowImageModal={setShowImageModal}
                  getImage={getImage}
                  title={obj.title}
                  price={obj.price}
                  image={obj.image}
                  key={obj.id}
                  id={obj.id}
                />
              );
            })}
        {isLoading && curData.length < 1 && (
          <h1 className={classes["error-status"]}>{error}</h1>
        )}
      </ProductsContainer>
    </div>
  );
}

export default HomePage;
