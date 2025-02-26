/* eslint-disable @next/next/no-img-element */
"use client";

export default function Advertise() {
  return (
    <div className="flex h-[627px]">
      {/* left */}
      <div className="flex gap-6">
        <img src="/images/advertise/ad1.png" alt="" className="h-[600px]" />
        <div className="flex flex-col justify-end gap-6">
          <img src="/images/advertise/ad2.png" alt="" className="w-[290px]" />
          <img src="/images/advertise/ad3.png" alt="" className="w-[290px]" />
        </div>
      </div>
      {/* right */}
      <div className="w-[460px] pl-[80px] flex-grow pt-32">
        <div className="flex flex-col">
          <span className="font-playfair font-medium text-[55px]">
            Fastest Food Delivery in City
          </span>
          <span className="font-sans font-normal text-base">
            Our visual designer lets you quickly and of drag a down your way to
            customapps for both keep desktop.
          </span>
        </div>
        <div className="font-sans text-lg font-medium pt-[50px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="bg-[#AD343E] w-8 h-8 rounded-full flex justify-center items-center">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.53504 4.02362V6.53528L8.41879 8.41903M12.1863 6.53528C12.1863 9.65638 9.65614 12.1865 6.53504 12.1865C3.41394 12.1865 0.883789 9.65638 0.883789 6.53528C0.883789 3.41418 3.41394 0.884033 6.53504 0.884033C9.65614 0.884033 12.1863 3.41418 12.1863 6.53528Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Delivery within 30 minutes</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-[#AD343E] w-8 h-8 rounded-full flex justify-center items-center">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.65131 7.79112L7.41881 4.02362M3.96529 4.33757H3.97157M7.10487 7.47716H7.11115M9.93048 12.1865V2.13987C9.93048 1.44629 9.36823 0.884033 8.67465 0.884033H2.39548C1.7019 0.884033 1.13965 1.44629 1.13965 2.13987V12.1865L3.33736 10.9307L5.53506 12.1865L7.73277 10.9307L9.93048 12.1865ZM4.27923 4.33757C4.27923 4.51097 4.13867 4.65153 3.96527 4.65153C3.79188 4.65153 3.65131 4.51097 3.65131 4.33757C3.65131 4.16418 3.79188 4.02362 3.96527 4.02362C4.13867 4.02362 4.27923 4.16418 4.27923 4.33757ZM7.41881 7.47716C7.41881 7.65055 7.27825 7.79112 7.10486 7.79112C6.93146 7.79112 6.7909 7.65055 6.7909 7.47716C6.7909 7.30376 6.93146 7.1632 7.10486 7.1632C7.27825 7.1632 7.41881 7.30376 7.41881 7.47716Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Best Offer & Prices</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-[#AD343E] w-8 h-8 rounded-full flex justify-center items-center">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.65131 7.79112L7.41881 4.02362M3.96529 4.33757H3.97157M7.10487 7.47716H7.11115M9.93048 12.1865V2.13987C9.93048 1.44629 9.36823 0.884033 8.67465 0.884033H2.39548C1.7019 0.884033 1.13965 1.44629 1.13965 2.13987V12.1865L3.33736 10.9307L5.53506 12.1865L7.73277 10.9307L9.93048 12.1865ZM4.27923 4.33757C4.27923 4.51097 4.13867 4.65153 3.96527 4.65153C3.79188 4.65153 3.65131 4.51097 3.65131 4.33757C3.65131 4.16418 3.79188 4.02362 3.96527 4.02362C4.13867 4.02362 4.27923 4.16418 4.27923 4.33757ZM7.41881 7.47716C7.41881 7.65055 7.27825 7.79112 7.10486 7.79112C6.93146 7.79112 6.7909 7.65055 6.7909 7.47716C6.7909 7.30376 6.93146 7.1632 7.10486 7.1632C7.27825 7.1632 7.41881 7.30376 7.41881 7.47716Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Online Services Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
