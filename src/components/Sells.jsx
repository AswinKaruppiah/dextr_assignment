import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "./Modal";
import { useContext } from "react";
import { SwapContext } from "../context/SwapState";

export default function Sells() {
  const [open, setOpen] = useState(false);
  const [SellCostLoading, setSellCostLoading] = useState(false);

  const { CurrentSell, Sell, setSell } = useContext(SwapContext);

  return (
    <div>
      <div className=" bg-[#1f1e1e]  rounded-2xl  flex justify-center items-center    gap-5 px-5 py-4">
        <div className="flex flex-col gap-1 w-full ">
          <p className="text-lg tracking-wide text-gray-300 ">Sell</p>
          <input
            type="text"
            value={Sell}
            placeholder="0"
            className="focus:outline-none text-white w-full placeholder:text-white     font-medium text-4xl py-2 bg-transparent "
            onChange={(e) => setSell(e.target.value.replace(/\D/g, ""))}
          />
          <p
            className={`text-base tracking-wide   text-gray-300 ${
              Sell ? "visible" : "invisible"
            } `}
          >
            {SellCostLoading
              ? "Loading"
              : `$ ${Sell * CurrentSell?.current_price}`}
          </p>
        </div>
        <div>
          <div
            onClick={() => setOpen(true)}
            className="flex justify-center text-white cursor-pointer px-2 h-10 hover:bg-black p-1 rounded-full border border-gray-700  items-center gap-1"
          >
            <img
              src={CurrentSell?.image}
              alt="swap"
              className="h-7 w-7 object-cover rounded-full"
            />
            <h1 className="font-bold text-xl -mr-1.5 ">
              {CurrentSell.symbol.toUpperCase()}
            </h1>
            <MdKeyboardArrowDown size="60" />
          </div>
        </div>
      </div>

      {open && (
        <Modal
          setSellCostLoading={setSellCostLoading}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
