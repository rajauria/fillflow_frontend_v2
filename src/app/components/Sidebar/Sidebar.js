"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
const Sidebar = ({ items }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="flex flex-col w-[23vw] h-screen bg-[#F8F6F2] font-medium text-[#838481]">
      <div className="flex flex-col px-4 py-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Image alt="" width={130} height={40} src={"/logo.svg"} />
        </div>
        {/* Sidebar Items */}
        <div className="mt-[2vw]">
          {items.map((item) => (
            <div key={item.id}>
              {/* Parent Item */}
              <button
                className="w-full text-[1.15vw] font-semibold  py-[1vw] px-4 text-left flex items-center justify-between hover:cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <span>{item.label}</span>
                {/* Arrow Icon */}
                {activeItem === item ? (
                  <IoIosArrowUp className="h-[1.1vw] w-[1.1vw] text-gray-500" />
                ) : (
                  <IoIosArrowDown className="h-[1.1vw] w-[1.1vw] text-gray-500" />
                )}
              </button>
              {/* Sub Items */}
              <div
                className={`pl-4 transition-max-height ${
                  activeItem === item
                    ? "max-h-screen transition duration-500 ease-in-out delay-200"
                    : "max-h-0 transition duration-300 ease-in-out"
                } overflow-hidden`}
              >
                {item.subItems.map((subItem) => (
                  <a href={subItem.path}>
                    <div className="flex items-center">
                      <BsDot />
                      <button
                        key={subItem.id}
                        className="w-full  text-[1vw] py-2 px-[0.5vw] text-left hover:cursor-pointer"
                      >
                        {subItem.label}
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
