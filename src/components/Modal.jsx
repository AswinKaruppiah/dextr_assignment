/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { SwapContext } from "../context/SwapState";
import Loader from "./Loader";
import exit from "../assets/img/svgexport-16.svg";
export default function Modal({ open, onClose, setSellCostLoading, input }) {
  const {
    CoinList,
    setCurrentSell,
    CurrentSell,
    Costapi,
    setCurrentBuy,
    CurrentBuy,
    convention,
    data,

    Sell,
    swap,
  } = useContext(SwapContext);

  const { loading, error } = CoinList();

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-10   flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-[#040D12] border border-gray-700 text-white rounded-xl fixed sm:w-[30rem] inset-6 sm:inset-20 overflow-hidden overflow-y-scroll sm:m-auto flex flex-col  justify-start items-start shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-2xl cursor-pointer hover:bg-gray-500 rounded-lg "
        >
          <IoExitOutline />
        </button> */}
        <img
          src={exit}
          alt="swap"
          onClick={onClose}
          className="absolute h-8 transition-colors  object-cover rounded-full top-3 right-3 p-1 text-2xl cursor-pointer hover:bg-gray-500  "
        />

        <h1 className="text-3xl font-bold">Select Token</h1>
        {loading ? (
          <div className="flex justify-center items-center w-full h-dvh">
            <Loader h="h-20" />
          </div>
        ) : error ? (
          <h1 className="text-lg font-medium py-3">SomeThing Went Wrong</h1>
        ) : (
          <div className="py-3 w-full ">
            {data &&
              data.map((item, index) => (
                <div
                  key={index}
                  className={`hover:bg-gray-900  w-full p-2 ${
                    CurrentSell?.name === item.name
                      ? "opacity-30 cursor-default"
                      : "cursor-pointer"
                  }  ${
                    CurrentBuy?.name === item.name
                      ? "opacity-30 cursor-default"
                      : "cursor-pointer"
                  } rounded-md transition-colors`}
                  onClick={async () => {
                    if (CurrentSell?.name === item.name) {
                      onClose();
                      return null;
                    }
                    if (CurrentBuy?.name === item.name) {
                      onClose();
                      return null;
                    }

                    if (input === "buy") {
                      setCurrentBuy(item);
                      if (convention.id === "") {
                        convention.id = "ethereum";
                      }
                      convention.sym = item.symbol;
                    } else {
                      setCurrentSell(item);
                      convention.id = item.id;
                    }

                    onClose();

                    setSellCostLoading(true);
                    if (convention.id && convention.sym) await Costapi();
                    setSellCostLoading(false);
                  }}
                >
                  <div className="flex justify-start items-center gap-5">
                    <img
                      src={item.image}
                      alt="swap"
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <div>
                      <h1 className="text-lg font-medium">{item.name}</h1>
                      <p className="text-gray-500 text-base font-normal">
                        {item.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
