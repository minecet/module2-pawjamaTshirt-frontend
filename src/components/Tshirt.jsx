//import tshirtTemplate from '../assets/emptydesign.png';

function Tshirt({
  //person,
  personName,
  petName,
  animalName,
  animalSpecies,
  onPersonNameChange,
  onAnimalNameChange,
  onAnimalSpeciesChange,
  onPetNameChange,
  speciesList,
  speciesData,
  selectedIcon,
  onIconSelect,
  colors,
  selectedColor,
  onColorSelect,
  selectedHairstyle,
  onHairstyleSelect,
  hairstyles,
  price,
  addToBasket,
}) {
const isAddToBasketDisabled =
    !personName || !petName || !animalSpecies || !animalName || !selectedIcon || !selectedHairstyle;
  
    //console.log("speciesData:", speciesData);
const currentCustomization = {
    personName,
    petName,
    selectedColor,
    selectedIcon,
    selectedHairstyle,
    price
    };
//console.log("animalName:", animalName);
//console.log(speciesData[animalName])


  return (
    <div className="flex flex-row justify-between items-start p-5 mt-10">
      {/* Left Side is the T-shirt Template */}
      <div className="flex-1 flex flex-col justify-center items-center relative">
      {/*  select T-shirt color */}
        <img
          src={`src/assets/${selectedColor}Tshirt.png`} // Dynamic T-shirt image based on selected color
          alt="T-shirt Template"
          className="max-w-md w-full h-auto"
        />

        {/* Selected Icon */}
        {selectedIcon && (
          <img
            src={selectedIcon}
            alt="Selected Icon"
            className="absolute top-36 left-2/6 transform -translate-x-1/2 w-20 h-20" // Adjusted position
          />
        )}
            {/* Selected Hairstyle */}
        {selectedHairstyle && (
        <img
            src={`src/assets/hairstyles/${selectedHairstyle}`}
            alt="Selected Hairstyle"
            className="absolute top-[145px] left-[300px]  transform -translate-x-1/2 w-14 h-14"
        />
        )}



        {// a rectangle to place the names
         //   <div className="absolute top-[200px] left-[120px] bg-red-500 w-40 h-10 opacity-50"></div>
        }
        {/* Person Name */}

        {personName && (
        <p className="absolute top-[210px] left-[300px] transform -translate-x-1/2 text-white text-lg font-bold">
            {personName}
        </p>
        )}
        {/* Pet's Name */}
        {petName && (
        <p className="absolute top-[210px] left-[240px] transform -translate-x-1/2 text-white text-lg font-bold">
            {petName}
        </p>
        )}
        <button
        className={`px-4 py-2 rounded ${
            isAddToBasketDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white"
        }`}
        onClick={() => addToBasket(currentCustomization)}
        disabled={isAddToBasketDisabled}
        >
        Add to Basket
        </button>
      </div>

      {/* Right Side: Form Entries */}
      <div className="flex-1 ml-4 mt-5">
        <form className="space-y-2">
          {/* Dropdown for Pet Type */}
          <div>
            <label htmlFor="animalSpecies" className="block text-sm font-medium text-gray-700">
              Pet Type
            </label>
            <select
              id="animalSpecies"
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={animalSpecies}
              onChange={onAnimalSpeciesChange}
            >
              <option value="">Select Pet</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <div className="flex items-center space-x-2 mt-2">
                {(colors || []).map((color) => (
                <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.name }}
                    onClick={(e) => {
                    e.preventDefault();
                    onColorSelect(color.name);
                    }}
                />
                ))}
            </div>
          </div>
          {/* Dropdown for Species */}

          <div>
            <label htmlFor="species" className="block text-sm font-medium text-gray-700">
                Species
            </label>
            <select
                id="species"
                className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={animalName}
                onChange={onAnimalNameChange}
            >
                <option value="">Select Species</option>
                {(speciesList || []).length > 0 ? (
                speciesList.map((species, index) => (
                    <option key={index} value={species}>
                    {species}
                    </option>
                ))
                ) : (
                <option disabled>No species available</option>
                )}
                
            </select>

            {/* Display Images Under the Dropdown */}
            {speciesData && animalName && speciesData[animalName] ? (
            <div className="flex flex-wrap mt-4">
            {[...Array(speciesData[animalName])].map((_, i) => (
            <img
              key={i}
              src={`src/assets/${animalName}/${animalName}${i + 1}.png`}
              alt={`${animalName} Icon ${i + 1}`}
              className="w-16 h-16 m-2 rounded cursor-pointer"
              onClick={() =>
              onIconSelect(`src/assets/${animalName}/${animalName}${i + 1}.png`)
                    }
                />
                ))}
            </div>
            ) : (
            <p>No images available for this species</p>
            )}
           </div>




          {/* Person Name Input */}
          <div>
            <label htmlFor="personName" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="personName"
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={personName}
              onChange={onPersonNameChange}
            />
          </div>

          {/* Pet's Name Input */}
          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
              Your Pet's Name
            </label>
            <input
              type="text"
              id="petName"
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={petName}
              onChange={onPetNameChange}
            />
          </div>
                        {/* Hairstyle Selection */}
            <div className="mt-10 flex flex-wrap gap-4">
            <label htmlFor="hairstyle" className="block text-sm font-medium text-gray-700">
              Your Style
            </label>
                {hairstyles.map((hairstyle, index) => (
                <img
                    key={index}
                    src={`src/assets/hairstyles/${hairstyle}`}
                    alt={`Hairstyle ${index + 1}`}
                    className="w-16 h-16 rounded cursor-pointer border border-gray-300 hover:border-blue-500"
                    onClick={() => onHairstyleSelect(hairstyle)}
                />
                ))}
            </div>
        </form>
      </div>
    </div>
  );
}

export default Tshirt;
