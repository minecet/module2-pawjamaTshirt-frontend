import React, { useEffect, useState } from "react";

function Basket({basket,setBasket, deleteBasketItem, totalPrice, calculateTotalPrice, updateBasketItem }) {

    async function getBasketItems() {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/basket`);
          const data = await response.json();
          setBasket(data); // Update basket state
          calculateTotalPrice(data); // Update total price
        } catch (error) {
          console.error("Error fetching basket items:", error);
        }
      }

    useEffect(() => {

    
        getBasketItems();
       // updateBasketItem();
      }, [totalPrice]); // render the basket if the total price has changed
    


  useEffect(() => {
    async function fetchBasket() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/basket`);
            const data = await response.json();
      
            // Separate totalPrice if it exists
            const totalPriceEntry = data.find((item) => item.id === "totalPrice");
            if (totalPriceEntry) {
              setTotalPrice(totalPriceEntry.value);
            }
      
            // Filter out totalPrice from the basket items
            const basketItems = data.filter((item) => item.id !== "totalPrice");
            setBasket(basketItems);
          } catch (error) {
            console.error("Error fetching basket:", error);
          }
    }

    fetchBasket();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Shopping Basket</h1>
      {basket.length > 0 ? (
        <ul>
          {basket.map((item, index) => (
            <li key={index} className="flex flex-row justify-between items-center space-x-4 mb-4 border-b pb-2">
             {//<img src={item.imageUrl} alt="T-shirt Design" className="w-32 h-auto" />
             } 
              <div>
                <p>Person: {item.personName}</p>
                <p>Pet: {item.petName}</p>
                <p>Color: {item.selectedColor}</p>
                <p>Price: €{item.price}</p>
              </div>
              <button
                onClick={() => deleteBasketItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your basket is empty!</p>
      )}
        <h2 className="text-xl font-bold mt-4">Total: €{totalPrice}</h2>
    </div>
  );
}

export default Basket;
