import React from "react";

const Checkbox: React.FC<any> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
        style={{ width: "20px", height: "20px" }}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
