/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Axios from "axios";
export const SwapContext = React.createContext();

export const Swapprovider = ({ children }) => {
  var defaultpors = {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    current_price: 3564.54,
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  };

  const [CurrentSell, setCurrentSell] = useState(defaultpors);
  const [CurrentSellcost, setCurrentSellcost] = useState(
    defaultpors.current_price
  );
  const [convention, setconvention] = useState({
    id: "",
    sym: "",
  });

  const [Sell, setSell] = useState("");
  const [CurrentBuy, setCurrentBuy] = useState();
  const [CurrentBuycost, setCurrenBuycost] = useState();
  const [swap, setswap] = useState("");
  const [data, setData] = useState();
  const [TransactionHistroy, setTransactionHistroy] = useState([]);

  const CoinList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchdata = async () => {
        setLoading(true);
        await Axios.get(
          "https://api.coingecko.com/api/v3/simple/supported_vs_currencies?x_cg_demo_api_key=CG-RMxtbEmJv9s1o3DhPcDJ45b3"
        )
          .then(async (supportlist) => {
            // console.log(supportlist.data);
            await Axios.get(
              "https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-RMxtbEmJv9s1o3DhPcDJ45b3"
            )
              .then((coinlist) => {
                // console.log(coinlist.data.slice(0, 50));
                return coinlist.data.filter((el) =>
                  supportlist.data.includes(el.symbol)
                );
              })
              .then(async (filterlist) => {
                var id = [];
                filterlist.map((item) => id.push(item.id));
                id = id.map(String).join(",");

                await Axios.get(
                  `https://api.coingecko.com/api/v3/coins/markets?ids=${id}&vs_currency=usd`
                )
                  .then((marketsList) => {
                    // console.log(marketsList.data);
                    setData(marketsList.data);
                  })
                  .catch((err) => setError(err));
              })

              .catch((err) => {
                setError(err);
              });
          })
          .catch((err) => {
            setError(err);
          });

        setLoading(false);
      };
      if (data) {
        console.log("already Exist");
      } else {
        fetchdata();
      }
    }, []);

    return { data, loading, error };
  };

  const Costapi = async () => {
    try {
      const response = await Axios.get(
        `https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=CG-RMxtbEmJv9s1o3DhPcDJ45b3&ids=${convention.id}&vs_currencies=${convention.sym}`
      );

      setswap(response?.data[convention.id][convention.sym] ?? "No Data");
    } catch (err) {
      return err;
    }
  };

  const Transaction = () => {
    var transction_detail = {
      sell: Sell,
      swap: swap,
      sell_sym: CurrentSell.symbol,
      buy_sym: CurrentBuy.symbol,
      sell_img: CurrentSell.image,
      buy_img: CurrentBuy.image,
      sell_cost: CurrentSell.current_price,
      buy_cost: CurrentBuy.current_price,
    };

    TransactionHistroy.push(transction_detail);
  };

  // "https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-RMxtbEmJv9s1o3DhPcDJ45b3"
  return (
    <SwapContext.Provider
      value={{
        CoinList,
        CurrentSell,
        setCurrentSell,
        Costapi,
        setCurrentSellcost,
        CurrentSellcost,
        CurrentBuy,
        CurrentBuycost,
        setCurrenBuycost,
        setCurrentBuy,
        swap,
        Sell,
        setSell,
        convention,
        setconvention,
        defaultpors,
        setswap,
        data,
        Transaction,
        TransactionHistroy,
        setTransactionHistroy,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};
