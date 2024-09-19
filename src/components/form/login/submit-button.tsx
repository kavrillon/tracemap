import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const status = useFormStatus();

  return (
    <div className="bg-gradient rounded-[8px] p-[2px]">
      <button
        type="submit"
        aria-disabled={status.pending}
        disabled={status.pending}
        className="hover:bg-primary-700 focus:ring-primary-300 w-full rounded-[6px] bg-white px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
      >
        <span className="text-gradient font-bold">Submit</span>
      </button>
    </div>
  );
}
