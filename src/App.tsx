import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([] as any[]);
  const [error, setErrors] = useState<string | null>(null);
  const [product, setProduct] = useState("");
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editProductName, setEditProductName] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await fetch("http://localhost:3000/products")
        ).json();
        setProducts(data);
      } catch (error: any) {
        setErrors(error.message);
      }
    })();
  }, []);

  const onDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa không ?")) {
      await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: product }),
      });

      if (product.trim() !== "") {
        const productNew = await data.json();
        setProducts([...products, productNew]);
        setProduct("");
      } else {
        alert("Vui lòng nhập");
      }
    } catch (error: any) {
      setErrors(error.message);
    }
  };
  const onEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      const data = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editProductName }),
      });

      const updatedProduct = await data.json();
      setProducts(
        products.map((item) => (item.id === id ? updatedProduct : item))
      );
      setEditProductId(null);
      setEditProductName("");
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const line = async (id: string) => {
    try {
      setProducts(
        products.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <div className="w-[600px] m-auto border-2 rounded px-4 py-4  text-center">
        <h1 className="font-bold mb-4 text-2xl">Danh sách</h1>
        <form  className="flex justify-between mb-5">
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Nhập"
            className=" w-[70%] outline-none border-2 border-black  px-3 rounded"
            type="text"
          />
          <button
            onClick={onAdd}
            className="border rounded-full px-6 py-2 bg-[#4747fb] text-white"
          >
            Thêm
          </button>
        </form>

        <div className="w-[100%] ">
          {products.map((item) => (
            <div
              key={item + 1}
              className="flex justify-between items-center py-2"
            >
              <input
                className="w-[5%] mr-6"
                type="checkbox"
                checked={item.completed}
                onClick={() => line(item.id)}
              />

              {editProductId === item.id ? (
                <form   onSubmit={(e) => onEdit(e, item.id)} className="flex justify-between w-[80%] ">
                  <input
                    // value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                    className="outline-none border-2 border-black px-3 w-[60%] rounded"
                    type="text"
                    defaultValue={item.name}
                  />
                  <div className="w-[40%] ml-4 flex justify-between">
                    <button className=" border rounded-full px-4 py-2 bg-[blue] text-white  ">
                      Save
                    </button>
                    <button
                      onClick={() => setEditProductId(null)}
                      className=" border rounded-full px-4 py-2 bg-[red] text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p
                    onClick={() => setEditProductId(item.id)}
                    className={item.completed ? "line-through" : ""}
                  >
                    {item.name}
                  </p>

                  <button
                    onClick={() => onDelete(item.id)}
                    className=" border rounded-full px-6 py-2 bg-[red] text-white  "
                  >
                    Xóa
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
