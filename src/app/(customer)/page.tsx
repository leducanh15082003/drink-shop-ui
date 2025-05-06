import Advertise from "@/components/homepage/Advertise";
import MenuList from "./menu/components/MenuList";

export default function Home() {
  return (
    <div>
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
          <div className="pt-5 flex gap-6">
            <MenuList />
          </div>
        </div>
        {/* our menu */}
      </main>
    </div>
  );
}
