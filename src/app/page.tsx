import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Advertise from "@/components/homepage/Advertise";
import Drink from "@/components/homepage/Drink";
import Menu from "@/components/Menu";

const drinks = [
  {
    imagePath: "/images/products/product1.png",
    name: "Espresso Ice Coffee",
    category: "Coffee",
    price: "11.00",
  },
  {
    imagePath: "/images/products/product2.png",
    name: "Cappuchino Ice Coffee",
    category: "Coffee",
    price: "11.00",
  },
  {
    imagePath: "/images/products/product3.png",
    name: "Americano Coffee",
    category: "Coffee",
    price: "11.00",
  },
  {
    imagePath: "/images/products/product4.png",
    name: "Robusta",
    category: "Coffee",
    price: "11.00",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main className="pb-28">
        {/* background image */}
        <div
          style={{ backgroundImage: "url('/images/About.jpg')" }}
          className="h-[500px] bg-cover bg-center"
        >
          <div className="flex flex-col pt-16 pl-16 font-poppins">
            <div className="text-white flex flex-col">
              <span className="font-semibold text-[60px]">
                LIFE IS NOT BETTER
              </span>
              <span className="font-medium text-[30px]">WITHOUT COFFEE</span>
            </div>
            <div className="bg-white py-3 w-[125px] rounded-3xl text-center mt-4">
              <span className="font-semibold text-[15px]">Order Now</span>
            </div>
          </div>
        </div>
        {/* background image */}

        {/* top Product */}
        <div className="pt-6 flex flex-col items-center">
          <span className="font-playfair text-[60px] font-normal">
            Top Products
          </span>
          <div className="flex gap-16 pt-4 pb-11">
            {drinks.map((drink, index) => (
              <Drink
                key={index}
                imagePath={drink.imagePath}
                name={drink.name}
                category={drink.category}
                price={drink.price}
              />
            ))}
          </div>
          <div className="bg-[#AD343E] py-3 px-10 rounded-3xl cursor-pointer">
            <span className="font-poppins font-semibold text-lg text-white">
              View All
            </span>
          </div>
        </div>
        {/* top Product */}

        {/* advertise */}
        <div className="pl-[90px] py-14 pr-[120px]">
          <Advertise />
        </div>
        {/* advertise */}

        {/* our menu */}
        <div className="flex flex-col items-center">
          <span className="font-playfair font-normal text-[60px]">
            Our Menu
          </span>
          <span className="text-center pt-5 w-full max-w-lg block mx-auto font-sans text-base font-normal text-[#495460]">
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </span>
          <div className="flex gap-4 pt-12">
            <div className="py-3 w-36 bg-[#AD343E] text-white font-sans font-bold text-base rounded-3xl text-center cursor-pointer">
              All
            </div>
            <div className="py-3 w-36 bg-white text-black font-sans font-bold text-base rounded-3xl text-center cursor-pointer border-[1px] border-[#DBDFD0]">
              Drinks
            </div>
            <div className="py-3 w-36 bg-white text-black font-sans font-bold text-base rounded-3xl text-center cursor-pointer border-[1px] border-[#DBDFD0]">
              Breakfast
            </div>
            <div className="py-3 w-36 bg-white text-black font-sans font-bold text-base rounded-3xl text-center cursor-pointer border-[1px] border-[#DBDFD0]">
              Desserts
            </div>
          </div>
          <div className="pt-14 flex gap-6">
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Fried Eggs"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="9.99"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Hawaiian Pizza"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="15.99"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Martinez Cocktail"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="7.25"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Butterscotch Cake"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="20.99"
            />
          </div>
          <div className="pt-6 flex gap-6">
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Mint Lemonade"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="5.89"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Chocolate Icecream"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="18.05"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Cheese Burger"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="12.55"
            />
            <Menu
              imagePath="/images/menu/FriedEggs.png"
              name="Classic Waffles"
              des="Made with eggs, lettuce, salt, oil and other ingredients."
              price="12.99"
            />
          </div>
        </div>
        {/* our menu */}
      </main>
      <Footer />
    </div>
  );
}
