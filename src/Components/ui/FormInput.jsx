export const FormInput = ({ type, textLabel, name, register, options }) => {
  return (
    <div className="relative mt-4">
      <input
        type={type}
        id={name}
        name={name}
        className="peer block w-full px-4 pt-6 pb-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-transparent"
        placeholder=" "  // Placeholder vacío para que funcione el peer-placeholder-shown
        {...register(name, options)}  // Aplica la función register al input
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 duration-300 transform scale-100 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:px-1 peer-focus:text-pink-500 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-2"
      >
        {textLabel}
      </label>
    </div>
  );
};
