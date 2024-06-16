import { SwapContext } from "../context/SwapState";
import Buy from "./Buy";
import Loader from "./Loader";
import Sells from "./Sells";
import { useContext, useState } from "react";

export default function Home() {
  const {
    Sell,
    setSell,
    setCurrentSell,
    defaultpors,
    setconvention,
    setCurrentBuy,
    setswap,
    Transaction,
  } = useContext(SwapContext);

  const [Loading, setLoading] = useState(false);
  const [err, seterr] = useState();

  return (
    <div className=" flex justify-center py-12 items-center ">
      <div className=" flex flex-col gap-1 bg-[#040D12] max-w-[550px]   p-1 rounded-md">
        <Sells />
        <Buy />
        {err && (
          <p className="text-red-600 font-medium tracking-wide"> {err.error}</p>
        )}
        <button
          onClick={() => {
            setLoading(true);
            if (Sell) {
              Transaction();

              setSell("");
              setCurrentSell(defaultpors);
              setCurrentBuy("");
              setswap("");
              setconvention({
                id: "",
                sym: "",
              });
              seterr("");
            } else {
              seterr({ error: "No Sell Value" });
            }
            setLoading(false);
          }}
          className="w-full bg-[#FF3FA4]  h-full  bg-opacity-20    rounded-2xl text-xl font-bold py-3 text-[#FF6AC2]"
        >
          {Loading ? (
            <div className="flex justify-center  items-center w-full">
              <Loader h="h-8" />
            </div>
          ) : (
            "Transaction"
          )}
        </button>
      </div>
    </div>
  );
}
