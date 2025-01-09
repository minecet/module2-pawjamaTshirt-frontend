import { useEffect, useState, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Route, Routes } from 'react-router-dom';
//import tshirtData from "./assets/tshirts.json"
import Tshirt from "./components/Tshirt"
import Basket from "./components/Basket"

//import tshirtTemplate from './assets/emptydesign.png'; // Import the template image
import { toPng } from "html-to-image";
function App() {

  const [animalSpecies, setAnimalSpecies] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [personName, setPersonName] = useState("");
  const [petName, setpetName] = useState("");
  const [selectedHairstyle, setSelectedHairstyle] = useState("");
  const [speciesData, setSpeciesData] = useState({});
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(""); // State for the selected icon
  const [selectedColor, setSelectedColor] = useState("white"); // Default color
  const[price,selectedPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(""); // State for size

  const tshirtRef = useRef(null);

  const [basket, setBasket] = useState([]); // Initialize as an empty array
  const [totalPrice, setTotalPrice] = useState(0);

  function calculateTotalPrice(items) {
      const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
      setTotalPrice(total);
      return total;
    }
  
  // List of colors and corresponding T-shirt images
  const colors = [
    { name: "black", image: "blackTshirt.png", price: 25 },
    { name: "white", image: "whiteTshirt.png", price: 30 },
  ];
  const hairstyles = [
    "hairstyle1.png",
    "hairstyle2.png",
  ];
  // Get T-shirt image for the selected color
  const tshirtTemplate = `src/assets/${colors.find((c) => c.name === selectedColor).image}`;
 // const person = "src/assets/person.png"
  useEffect(() => {
    async function fetchSpeciesData() {
      console.log("Fetching species data for:", animalSpecies); // Log the pet type (dog/cat)
  
      if (!animalSpecies) {
        console.log("No pet type selected");
        setSpeciesList([]);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:4000/${animalSpecies}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Received species data:", data); // Log the fetched data
  
          const species = data[0]; // Assuming the backend structure
          setSpeciesList(Object.keys(species || {}));
          setSpeciesData(species || {}); // Update species data
          console.log("Species list updated:", Object.keys(species || {})); // Log the updated species list


        } else {
          console.error("Failed to fetch species data, status:", response.status);
          setSpeciesList([]);
          setSpeciesData({});

        }
      } catch (error) {
        console.error("Error fetching species data:", error);
        setSpeciesList([]);
        setSpeciesData({});

      }
    }
  
    fetchSpeciesData();
  }, [animalSpecies]);
  /* render price again if color changes */
  useEffect(() => {          
    selectedPrice(colors.find((c) => c.name === selectedColor).price)
    console.log(colors.find((c) => c.name === selectedColor).price)
    }, 
    [selectedColor])


  
  async function updateBasketItem(totalPrice) {
    const totalPriceEntry = {
      "totalPrice": totalPrice,
      "id": 1
    };
    try {
      const response = await fetch(`http://localhost:4000/totalPrice/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: totalPrice, id: 1 }),
      });
      const data = await response.json();
      console.log("Basket item updated:", data);
    } catch (error) {
      console.error("Error updating basket item:", error);
    }
  }

  async function deleteBasketItem(itemId) {
    try {
      await fetch(`http://localhost:4000/basket/${itemId}`, {
        method: "DELETE",
      });
      console.log("Basket item deleted:", itemId);

    const updatedBasket = basket.filter((item) => item.id !== itemId);
    setBasket(updatedBasket);

    const newTotalPrice = calculateTotalPrice(updatedBasket); // Calculate the new total price
    setTotalPrice(newTotalPrice);

    await updateBasketItem(newTotalPrice); // Use the calculated total price
     /* getBasketItems(); // Refresh the basket
      setTotalPrice(calculateTotalPrice(basket))
      await updateBasketItem(totalPrice);    */
    } catch (error) {
      console.error("Error deleting basket item:", error);
    }
  }
  async function addToBasket(item) {
    try {
      const response = await fetch("http://localhost:4000/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      console.log("Item added to basket:", data);
     /* console.log(setTotalPrice(calculateTotalPrice(basket)))
      setTotalPrice(calculateTotalPrice(basket))
      await updateBasketItem(totalPrice);*/
      const updatedBasket = [...basket, data];
      setBasket(updatedBasket);
  
      const newTotalPrice = calculateTotalPrice(updatedBasket); // Calculate the new total price
      setTotalPrice(newTotalPrice);
  
      await updateBasketItem(newTotalPrice); // Use the calculated total price
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  }
  
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        {/* Other Routes */}
        <Route path="/basket" element={<Basket 
          deleteBasketItem={deleteBasketItem} 
          basket={basket}
          totalPrice={totalPrice}
          setBasket={setBasket}
          calculateTotalPrice={calculateTotalPrice}
          updateBasketItem={updateBasketItem}

          />} 
        />
        <Route path="/" element={<Tshirt 
          tshirtTemplate={tshirtTemplate}
          //   person={person}
          personName={personName}
          animalName={animalName}
          petName={petName}
          animalSpecies={animalSpecies}
          onPersonNameChange={(e) => setPersonName(e.target.value)}
          onAnimalNameChange={(e) => setAnimalName(e.target.value)}
          onSpeciesNameChange={(e) => setSpeciesName(e.target.value)}
          onAnimalSpeciesChange={(e) => setAnimalSpecies(e.target.value)}
          onPetNameChange={(e) => setpetName(e.target.value)}
          onSetSelectedSize={(e) => setSelectedSize(e.target.value)}
          price={price}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          colors={colors}
          selectedIcon={selectedIcon}
          onIconSelect={(icon) => setSelectedIcon(icon)}
          speciesList={speciesList} // Pass the correct species list
          speciesData={speciesData} // Pass species data if needed
          selectedHairstyle={selectedHairstyle}
          onHairstyleSelect={(hairstyle) => setSelectedHairstyle(hairstyle)}
          hairstyles={hairstyles}
          ref={tshirtRef}
          addToBasket={addToBasket}
          selectedSize={selectedSize}
        />} />

      </Routes>



    </div>
  );
}

export default App;
