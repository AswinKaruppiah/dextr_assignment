import { useContext } from "react";
import { SwapContext } from "../context/SwapState";

export default function Histroy() {
  const { TransactionHistroy } = useContext(SwapContext);

  return (
    <div className="max-w-7xl m-auto p-3 sm:p-0">
      <h1 className="text-5xl text-white font-bold">Transaction Histroy</h1>
      <div className="flex   w-full   justify-start items-center gap-6  py-3 px-1  flex-wrap">
        {TransactionHistroy &&
          TransactionHistroy.map((item, index) => (
            <div
              key={index}
              className="bg-[#1f1e1e] transition-all   sm:hover:scale-105    flex justify-between flex-wrap items-center  max-w-fit gap-6     rounded-2xl p-3"
            >
              <div>
                <div className="flex justify-start text-white py-1   items-center gap-1">
                  <img
                    src={item?.sell_img}
                    alt="swap"
                    className="h-7 w-7 object-cover rounded-full"
                  />
                  <h1 className="font-bold text-xl -mr-1.5 ">
                    {item.sell_sym.toUpperCase()}
                  </h1>
                </div>
                <p className="text-base tracking-wide font-medium ml-2 text-gray-300 ">
                  Sell = {item.sell}
                </p>
                <h3 className=" text-lg tracking-wide font-medium  text-gray-300 ">
                  {`1${item.sell_sym.toUpperCase()} = $ ${item.sell_cost}`}
                </h3>
                <h3 className=" text-lg tracking-wide font-medium  text-gray-300 ">
                  {`ToTal = $ ${item.sell_cost * item.sell}`}
                </h3>
              </div>
              <div>
                <div className="flex justify-start text-white py-1   items-center gap-1">
                  <img
                    src={item?.buy_img}
                    alt="swap"
                    className="h-7 w-7 object-cover rounded-full"
                  />
                  <h1 className="font-bold float-left text-xl -mr-1.5 ">
                    {item.buy_sym.toUpperCase()}
                  </h1>
                </div>
                <p className="text-base tracking-wide font-medium ml-2 text-gray-300 ">
                  Buy = {item.swap}
                </p>
                <h3 className=" text-lg tracking-wide font-medium  text-gray-300 ">
                  {`1${item.buy_sym.toUpperCase()} = $ ${item.buy_cost}`}
                </h3>
                <h3 className=" text-lg tracking-wide font-medium  text-gray-300 ">
                  {`ToTal = $ ${item.buy_cost * item.swap * item.sell}`}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
