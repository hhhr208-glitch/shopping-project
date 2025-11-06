"use client";

import { useFormStatus } from 'react-dom';

export function EditButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-2 px-4 rounded transition-all duration-300 transform font-semibold shadow-lg ${
        pending 
          ? 'bg-gray-600 cursor-not-allowed ' 
          : 'bg-black text-white hover:bg-gray-800 hover:scale-105'
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Editing...
        </span>
      ) : (
        "Edit Product"
      )}
    </button>
  );
}









