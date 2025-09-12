import React from "react";


type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
};


const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id, disabled }) => (
  <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''}`} htmlFor={id}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="sr-only peer"
      disabled={disabled}
    />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-checked:bg-blue-400 transition-all"></div>
    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
  </label>
);

export default ToggleSwitch;
