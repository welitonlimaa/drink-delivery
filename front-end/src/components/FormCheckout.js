import Select from './Select';

function FormCheckout() {
  return (
    <form className="w-full max-w-6xl">
      <div className="flex flex-wrap justify-center">
        <div className="w-60 inline-block">
          <p
            className="w-full block uppercase tracking-wide text-gray-700
            text-xs font-bold mb-2"
          >
            P. Vendedora Responsável:
          </p>
          <div className="relative">
            <Select
              id="seller"
              name="seller"
              options={ [{ id: 1, name: 'Vendedor' }] }
              handleChange={ () => console.log() }
              value="alo"
            />
          </div>
        </div>
        <label
          className="w-60 mx-2 uppercase tracking-wide
          text-gray-700 text-xs font-bold"
          htmlFor="address"
        >
          Endereço
          <input
            id="address"
            type="text"
            placeholder=""
            className="appearance-none block w-full bg-gray-200 text-gray-700 border
            rounded py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white"
          />
        </label>
        <label
          className="w-32 mx-4 uppercase tracking-wide text-gray-700
          text-xs font-bold mb-2"
          htmlFor="addressNumber"
        >
          Número
          <input
            id="addressNumber"
            type="text"
            placeholder=""
            className="appearance-none block w-full bg-gray-200 text-gray-700 border
            border-gray-200 rounded py-3 px-4 my-2 leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
          />
        </label>
      </div>
    </form>
  );
}

export default FormCheckout;
