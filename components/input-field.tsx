import React from "react";
interface Field {
  label?: string;
  name: string;
  type: string;
  value: string;
  id?: string;
  placeholder: string;
  htmlFor: string;
  onChange: (value: string) => void;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  htmlFor,
  value,
  onChange,
}: Field) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <label
        htmlFor={htmlFor}
        className="font-normal text-base  text-[#4A4C58] font-switzer"
      >
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="w-[386px] h-[54px] rounded-[8px] outline-none border-[#F0F0F1] border font-switzer pl-[15px]"
      />
    </div>
  );
};
export default InputField;
