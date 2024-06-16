import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "./Modal";
import { useContext } from "react";
import { SwapContext } from "../context/SwapState";

function Buy() {
  const [open, setOpen] = useState(false);
  const [SellCostLoading, setSellCostLoading] = useState(false);

  const { CurrentBuy, swap, Sell, CurrentSell } = useContext(SwapContext);

  function calculate(newvalue, oldvalue) {
    var sub = (
      ((newvalue - oldvalue * Sell) / (oldvalue * Sell)) *
      100
    ).toFixed(2);
    // Math.sign(number) === -1;

    return (
      <span
        className={`${
          Math.sign(sub) === -1 ? "text-red-600" : "text-green-600"
        } text-gray-400 ml-2 tracking-wide`}
      >{`(${sub}%)`}</span>
    );
  }
  return (
    <div>
      <div className=" bg-[#1f1e1e]     rounded-2xl  flex justify-center items-center    gap-5 px-5 py-4">
        <div className="flex flex-col gap-1 w-full ">
          <p className="text-lg tracking-wide text-gray-300 ">Buy</p>
          <input
            type="text"
            value={SellCostLoading ? "Loading" : Sell ? swap * Sell : 0}
            placeholder="0"
            className="focus:outline-none text-white w-full placeholder:text-white      font-medium text-4xl py-2 bg-transparent "
          />
          <p
            className={`text-base tracking-wide   text-gray-300 ${
              CurrentBuy?.current_price ? "visible" : "invisible"
            } `}
          >
            {/* 1${CurrentBuy?.name && CurrentBuy.name} =  $ ${ */}
            {SellCostLoading
              ? "Loading"
              : "$" +
                "" +
                (CurrentBuy?.current_price * swap * Sell).toFixed(2)}{" "}
            {SellCostLoading
              ? "Loading"
              : Sell &&
                calculate(
                  CurrentBuy?.current_price * Sell * swap,
                  CurrentSell.current_price
                )}
          </p>
        </div>
        <div>
          <div
            onClick={() => setOpen(true)}
            className="flex justify-center text-white cursor-pointer px-2 h-10 hover:bg-black p-1 rounded-full border border-gray-700  items-center gap-1"
          >
            {CurrentBuy && (
              <img
                src={CurrentBuy?.image}
                alt="swap"
                className="h-7 w-7 object-cover rounded-full"
              />
            )}
            <h1
              className={`font-bold text-xl -mr-1.5 ${
                CurrentBuy?.symbol ? null : "pl-2"
              }  `}
            >
              {CurrentBuy?.symbol?.toUpperCase() ?? "SELECT"}
            </h1>
            <MdKeyboardArrowDown size={CurrentBuy?.symbol ? "60" : "35"} />
          </div>
        </div>
      </div>

      {open && (
        <Modal
          input="buy"
          setSellCostLoading={setSellCostLoading}
          //   setSellCostLoading={setSellCostLoading}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Buy;
