"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div className="relative w-full">
      <div
        className={`background-light800_darkgradient flex min-h-[56px]  grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
        <Input
          className="paragraph-regular background-light800_darkgradient no-focus  placeholder border-none shadow-none outline-none"
          type="text"
          placeholder={placeholder}
          value=""
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default LocalSearchBar;
