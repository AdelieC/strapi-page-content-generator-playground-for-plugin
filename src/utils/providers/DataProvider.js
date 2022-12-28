import React, { useState, createContext, useContext } from "react";
import getData from "../api/getData";

const DataContext = createContext({
  data: {},
  setData: () => {}
});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = async (key) => {
    if (!(key in data)) {
      const res = await getData(key);
      const newData = { ...data };
      newData[key] = res;
      setData(newData);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        fetchData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
