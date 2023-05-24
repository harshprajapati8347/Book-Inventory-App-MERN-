import { useState, useEffect } from "react";
import axios from "axios";
import { Inventory, Actions } from "./components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";

const App = () => {
  const [selected, setSelected] = useState([]);
  const [showLowStock, setShowLowStock] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getAllInventories = async () => {
    const response = await axios.get("/api/inventory/all");
    setInventories(response.data.data.inventories);
  };

  useEffect(() => {
    getAllInventories();
  }, [data]);

  // if inventories is empty, return loading
  useEffect(() => {
    if (inventories.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [inventories]);

  return (
    <div className="App">
      <ToastContainer />
      <Actions
        setData={setData}
        setShowLowStock={setShowLowStock}
        showLowStock={showLowStock}
        selected={selected}
      />
      {loading ? (
        <Loading />
      ) : (
        <Inventory
          setData={setData}
          selected={selected}
          setSelected={setSelected}
          data={
            showLowStock
              ? inventories.filter(
                  (item) => item.stockQuantity <= item.lowQuantity
                )
              : inventories
          }
        />
      )}
    </div>
  );
};

export default App;
