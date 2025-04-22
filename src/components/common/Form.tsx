import React, { FormEvent } from "react";

interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-gray-100 rounded shadow">
      {children}
    </form>
  );
};

export default Form;