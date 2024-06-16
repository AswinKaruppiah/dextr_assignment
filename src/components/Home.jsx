import { SwapContext } from "../context/SwapState";
import Buy from "./Buy";
import Loader from "./Loader";
import Sells from "./Sells";
import { useContext, useState } from "react";

export default function Home() {
  const {
    Sell,
    setSell,
    CurrentSell,
    CurrentBuy,
    setCurrentSell,
    defaultpors,
    setconvention,
    setCurrentBuy,
    setswap,
    Transaction,
    swap,
  } = useContext(SwapContext);

  const [Loading, setLoading] = useState(false);
  const [err, seterr] = useState();
  const [switchbtn, setswitchbtn] = useState(true);

  return (
    <div className=" h-screen flex justify-center  items-center ">
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
          className="w-full bg-[#FF3FA4]  h-full  bg-opacity-20 hover:bg-opacity-15    rounded-2xl text-xl font-bold py-4 text-[#FF6AC2]"
        >
          {Loading ? (
            <div className="flex justify-center  items-center w-full">
              <Loader h="h-8" />
            </div>
          ) : (
            "Transaction"
          )}
        </button>

        {Sell && CurrentBuy?.symbol ? (
          switchbtn ? (
            <p
              onClick={() => setswitchbtn(!switchbtn)}
              className={`text-sm tracking-wide  py-1 cursor-pointer  text-gray-300 ${
                Sell ? "visible" : "invisible"
              } `}
            >
              {`1 ${CurrentSell.symbol.toUpperCase()} = ${swap} ${CurrentBuy?.symbol.toUpperCase()} ($${
                CurrentSell?.current_price
              })`}
            </p>
          ) : (
            <p
              onClick={() => setswitchbtn(!switchbtn)}
              className={`text-sm tracking-wide  py-1 cursor-pointer  text-gray-300 ${
                Sell ? "visible" : "invisible"
              } `}
            >
              {`1 ${CurrentBuy?.symbol.toUpperCase()} = ${(1 / swap).toFixed(
                7
              )} ${CurrentSell?.symbol.toUpperCase()} ($${
                CurrentBuy?.current_price
              })`}
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
