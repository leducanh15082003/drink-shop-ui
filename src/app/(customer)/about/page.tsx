"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const faqs = [
  {
    question: "What are your opening hours?",
    answer:
      "We're open daily from 7:00 AM to 9:00 PM. Weekend hours may vary slightly during holidays—check our social media for updates!",
  },
  {
    question: "Do you offer non-dairy milk options?",
    answer: "Yes, we offer oat, almond, and soy milk options for all drinks.",
  },
  {
    question: "Do you sell coffee beans or tea leaves for home brewing?",
    answer:
      "Absolutely! We have a selection of beans and leaves available in-store.",
  },
  {
    question: "Can I reserve a table or space for a group?",
    answer: "Yes, please call us ahead or use our online reservation form.",
  },
  {
    question: "Are your products ethically sourced?",
    answer:
      "All our products are sourced from suppliers that follow ethical and sustainable practices.",
  },
];

const testimonials = [
  {
    title: "“The best tea shop”",
    content:
      "A hidden gem! I came in for tea and ended up staying for hours. The jasmine green tea is perfection, and the vibe is so relaxing.",
    name: "Linh Nguyen",
    location: "Hanoi, Vietnam",
    avatar: "/images/avatars/linhnguyen.png",
  },
  {
    title: "“Simply delicious”",
    content:
      "Their oat milk lattes are the best in town. And the pastries? Don’t even get me started. Try the matcha croissant—you won’t regret it!",
    name: "Lê",
    location: "Hanoi, Vietnam",
    avatar: "/images/avatars/le.png",
  },
  {
    title: "“One of a kind drink shop”",
    content:
      "I hosted a small meetup here and everything was great. Cozy seating, fast Wi-Fi, and plenty of power outlets. It’s the perfect spot for remote work or catch-ups.",
    name: "Khanh Huyen",
    location: "Hanoi, Vietnam",
    avatar: "/images/avatars/huyen.png",
  },
];

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState(0);
  return (
    <div className="bg-white flex justify-center flex-col">
      <div className="bg-[#F9F9F7] flex">
        <div className="w-1/2 pl-16 py-10 relative">
          <img
            src="/images/about-page.png"
            alt=""
            className="rounded-lg w-[600px] object-contain"
          />
          <div className="absolute bottom-4 right-10 bg-[#AD343E] rounded-lg text-white w-[280px] shadow-lg">
            <div className="px-7 py-7">
              <strong className="block mb-4 text-lg">Come and visit us</strong>
              <div className="space-y-4">
                <div className="flex gap-2 items-start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3C1 1.89543 1.89543 1 3 1H6.27924C6.70967 1 7.09181 1.27543 7.22792 1.68377L8.72574 6.17721C8.88311 6.64932 8.66938 7.16531 8.22427 7.38787L5.96701 8.5165C7.06925 10.9612 9.03878 12.9308 11.4835 14.033L12.6121 11.7757C12.8347 11.3306 13.3507 11.1169 13.8228 11.2743L18.3162 12.7721C18.7246 12.9082 19 13.2903 19 13.7208V17C19 18.1046 18.1046 19 17 19H16C7.71573 19 1 12.2843 1 4V3Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>(+84) 878 813 188</p>
                </div>
                <div className="flex gap-2 items-start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L8.8906 9.2604C9.5624 9.70827 10.4376 9.70827 11.1094 9.2604L19 4M3 15H17C18.1046 15 19 14.1046 19 13V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>hemtrachanh@gmail.com</p>
                </div>
                <div className="flex gap-2 items-start">
                  <svg
                    width="58"
                    height="58"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6569 14.6569C13.7202 15.5935 11.7616 17.5521 10.4138 18.8999C9.63275 19.681 8.36768 19.6814 7.58663 18.9003C6.26234 17.576 4.34159 15.6553 3.34315 14.6569C0.218951 11.5327 0.218951 6.46734 3.34315 3.34315C6.46734 0.218951 11.5327 0.218951 14.6569 3.34315C17.781 6.46734 17.781 11.5327 14.6569 14.6569Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>
                    Km9 Nguyen Trai Street, Van Quan Ward, Nam Tu Liem, Hanoi,
                    Vietnam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center p-6 space-y-4">
          <strong className="text-6xl font-playfair font-medium">
            A cozy corner where drink enthusiasts find their perfect cup.
          </strong>
          <span className="font-sans text-[18px]">
            Founded with a passion for rich brews and warm connections, our shop
            is more than just a place to grab a drink. It’s a space where
            stories are shared, ideas are sparked, and every sip is crafted with
            care. We source our beans and leaves from trusted growers who share
            our commitment to quality and sustainability, ensuring every cup is
            as good for the planet as it is for your soul.
          </span>
          <span className="font-sans text-[16px]">
            Whether you’re starting your morning with a bold espresso, winding
            down with a calming herbal blend, or discovering something new from
            our seasonal specials, we’re here to make your experience
            meaningful.
          </span>
        </div>
      </div>
      <div className="flex px-16 py-16 gap-4">
        <div className="flex gap-2">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38 46L6 43V5L38 2V46Z"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 6V42"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 29H29"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 36L29 37"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 22C24.3137 22 27 19.3137 27 16C27 12.6863 24.3137 10 21 10C17.6863 10 15 12.6863 15 16C15 19.3137 17.6863 22 21 22Z"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <strong>Multi Cuisine</strong>
            <span className="text-sm">
              In the new era of technology we look in the future with certainty
              life.
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38 22H10V38H38V22Z"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 28H17"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M29 12C30.1046 12 31 11.1046 31 10C31 8.89543 30.1046 8 29 8C27.8954 8 27 8.89543 27 10C27 11.1046 27.8954 12 29 12Z"
              fill="#474747"
            />
            <path
              d="M37 12C38.1046 12 39 11.1046 39 10C39 8.89543 38.1046 8 37 8C35.8954 8 35 8.89543 35 10C35 11.1046 35.8954 12 37 12Z"
              fill="#474747"
            />
            <path
              d="M40 4H8C5.79086 4 4 5.79086 4 8V40C4 42.2091 5.79086 44 8 44H40C42.2091 44 44 42.2091 44 40V8C44 5.79086 42.2091 4 40 4Z"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10H16"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16H44"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <strong>Easy To Order</strong>
            <span className="text-sm">
              In the new era of technology we look in the future with certainty
              life.
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 28V46H6V28"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 2H31"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 28L32.5 19.5"
              stroke="#AD343E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 2V5"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 46C33.9411 46 42 37.9411 42 28C42 18.0589 33.9411 10 24 10C14.0589 10 6 18.0589 6 28C6 37.9411 14.0589 46 24 46Z"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 16V18"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36 28H34"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.485 36.4853L31.071 35.0713"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 40V38"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.515 36.4853L16.929 35.0713"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 28H14"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.515 19.5146L16.929 20.9286"
              stroke="#474747"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <strong>Fast Delivery</strong>
            <span className="text-sm">
              In the new era of technology we look in the future with certainty
              life.
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#FAF9F6] px-10 py-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-extrabold mb-6 font-playfair">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-md shadow-sm divide-y">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(idx)}
                className={`flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50 ${
                  selected === idx ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selected === idx ? "bg-[#AD343E]" : "bg-pink-200"
                    }`}
                  ></div>
                  <p className="text-sm font-medium">{item.question}</p>
                </div>
                <span className="text-gray-400">&gt;</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg p-6 shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">
            {faqs[selected].question}
          </h3>
          <p className="text-sm text-gray-700">{faqs[selected].answer}</p>
        </div>
      </div>
      <section className="py-16 px-6 md:px-20 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F9F9F7] p-6 rounded-xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#AD343E] mb-3">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-700">{t.content}</p>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
