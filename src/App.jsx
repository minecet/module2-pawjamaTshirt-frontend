import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  const tshirtRef = useRef(null);

  // List of colors and corresponding T-shirt images
  const colors = [
    { name: "black", image: "blackTshirt.png" },
    { name: "white", image: "whiteTshirt.png" },
  ];
  const hairstyles = [
    "hairstyle1.png",
    "hairstyle2.png",
   // "hairstyle3.png",
   // "hairstyle4.png",
   // "hairstyle5.png",
   // "hairstyle6.png",
   // "hairstyle7.png",
   /// "hairstyle8.png",
   // "hairstyle9.png",
   // "hairstyle10.png",
   // "hairstyle11.png",
   // "hairstyle12.png",
   // "hairstyle13.png",
   // "hairstyle14.png",
   // "hairstyle15.png",
   // "hairstyle16.png",
   // "hairstyle17.png",
   // "hairstyle18.png",


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
  



  
  async function updateBasketItem(itemId, updatedItem) {
    try {
      const response = await fetch(`http://localhost:4000/basket/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
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
      getBasketItems(); // Refresh the basket
    } catch (error) {
      console.error("Error deleting basket item:", error);
    }
  }

  async function addToBasketWithImage(customization) {
    // Generate the image
    const imageUrl = await toPng(tshirtRef.current);

    // Send the image as part of the basket item
    const basketItem = {
      ...customization, // Includes personName, petName, selectedColor, etc.
      imageUrl, // Base64 image
    };

    try {
      const response = await fetch("http://localhost:4000/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basketItem),
      });
      const data = await response.json();
      console.log("Added to basket:", data);
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
          deleteBasketItem={deleteBasketItem} />} 
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
          onAddToBasket={addToBasketWithImage}
    
        />} />

      </Routes>



    </div>
  );
}

export default App;
