import { ChangeEvent, FormEvent, useState } from "react";

export default function AddressForm({
  handler,
}: {
  handler: (address: string) => void;
}) {
  const [values, setValues] = useState({
    address: "",
  });
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handler(values.address);
  }

  function handleAddressInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.persist();
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="publicKey"
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          className="block p-2 text-black"
          onChange={handleAddressInputChange}
        />
        <button className="px-4 py-2 bg-blue-600 mt-4 rounded" type="submit">Check balance</button>
      </form>
    </div>
  );
}
