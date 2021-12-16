/*
 * input and controls for adding a slot for a zip code
 */
const Item = ({ change, value, num, remove }) => {
  return (
    <div className="mb-4 flex flex-col">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={value}
      >
        Location {num + 1}
      </label>
      <span>
        <input
          onChange={change}
          name={num}
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={value}
          value={value}
          type="text"
          placeholder="zipcode"
        />
        {num >= 2 ? (
          <button
            onClick={remove}
            name={num}
            className="bg-red-500 hover: bg-red-700 text-white font-bold mx-4 py-2 px-3 rounded-md focus:outline-none focus:shadow-outline"
            type="button"
          >
            -
          </button>
        ) : null}
      </span>
    </div>
  );
};

export default Item;
