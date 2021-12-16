

const Item = ({change, value, num}) => {
  return (
    <div className="mb-4 flex flex-col">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={value}>
      Location {num + 1}
    </label>
    <input onChange={change} name={num} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={value} type="text" placeholder="zipcode" />
  </div>
  );
};


export default Item;
