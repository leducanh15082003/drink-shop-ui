import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";

const products = [
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
        <div className="pt-11 flex flex-col items-center">
          <span className="font-playfair text-[60px] font-normal">
            Top Products
          </span>
          <div className="flex gap-16 pt-4 pb-11">
            {products.map((product, index) => (
              <Product
                key={index}
                imagePath={product.imagePath}
                name={product.name}
                category={product.category}
                price={product.price}
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
      </main>
      <Footer />
    </div>
  );
}
