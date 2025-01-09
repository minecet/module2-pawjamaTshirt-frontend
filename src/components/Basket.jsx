import React, { useEffect, useState } from "react";

function Basket({deleteBasketItem }) {
    const [basket, setBasket] = useState([]); // Initialize as an empty array
    async function getBasketItems() {
        try {
          const response = await fetch("http://localhost:4000/basket");
          const data = await response.json();
          console.log("Basket items:", data);
          setBasket(data); // Update your basket state
        } catch (error) {
          console.error("Error fetching basket items:", error);
        }
      }

      async function deleteBasketItem(itemId) {
        try {
          await fetch(`http://localhost:4000/basket/${itemId}`, {
            method: "DELETE",
          });
          console.log("Basket item deleted:", itemId);
          getBasketItems(); // Refresh the basket
        } catch (error) {
          console.error("Error deleting basket item:", error);
        }
      }
  useEffect(() => {
    async function fetchBasket() {
      try {
        const response = await fetch("http://localhost:4000/basket");
        const data = await response.json();
        setBasket(data); // Set the basket data
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
            <li key={index} className="flex items-center space-x-4 mb-4 border-b pb-2">
              <img src={item.imageUrl} alt="T-shirt Design" className="w-32 h-auto" />
              <div>
                <p>Person: {item.personName}</p>
                <p>Pet: {item.petName}</p>
                <p>Color: {item.selectedColor}</p>
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
    </div>
  );
}

export default Basket;
