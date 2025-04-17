import { stripeService } from "../../services/authServices";

export default function PremiumButton({ userId }: { userId: number }) {
  const handlePay = async () => {
     await stripeService({userId})
  };

  return (
    <button
      onClick={handlePay}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:cursor-pointer"
    >
      Hacerse Premium ($10)
    </button>
  );
}
