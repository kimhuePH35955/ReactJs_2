// về nhà code thêm ,  xóa,
// Yêu cầu 3: edit: khi click vào text hiển thị value vào trong input .
//  bên phải có nút save và nút cancel. nếu click vào save thì lưu giá trị mới.
//  click vào cancel thì hủy bỏ và đưa về giá trị ban đầu
// Yêu cầu 4: bên phải các text có nút checkbox, khi click vào nút checkbox thì text bị gạch ngang


import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Sản phẩm 1",
      completed: false,
    },
    {
      id: 3,
      title: "Sản phẩm 3",
      completed: false,
    },
    {
      id: 2,
      title: "Sản phẩm 2",
      completed: false,
    },
  ]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState({ id: -1, title: "" });
  const [tempCancel, setTempCancel] = useState({ id: -1, title: "" });

  const onChangInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };
  const onAdd = () => {
    if (newItem.trim() !== "") {
      const newItemGr = {
        id: todos.length + 1,
        title: newItem,
        completed: false,
      };
      setTodos([...todos, newItemGr]);
      setNewItem("");
    }
  };
  const onDelete = (id: any) => {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      setTodos(todos.filter((todos) => todos.id !== id));
    }
  };
  const onEdit = (id: number, title: string) => {
    setEditItem({ id, title });
    setTempCancel({ id, title });
    setNewItem(title);
  };
  const onSave = () => {
    if (editItem.id !== -1 && newItem.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === editItem.id ? { ...todo, title: newItem } : todo
        )
      );
      setEditItem({ id: -1, title: "" });
      setNewItem("");
    }
  };
  const onCancel = () => {
    setEditItem({ id: -1, title: "" });
    setNewItem(tempCancel.title);
    
  };

  const toggleComplete=(id:number)=>{
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <>
      <div className="w-[600px] border-gray border-2 m-auto rounded px-4 py-4">
        <h1 className="font-bold mb-[20px]">Danh sách item</h1>
        <div className="flex justify-between mb-[30px]">
          <input
            type="text"
            value={newItem}
            onChange={onChangInput}
            className="border-2 outline-none w-[60%]  px-3 rounded"
          />
          <div className="flex">
            <button
              onClick={onSave}
              className=" border rounded-full px-6 py-2 bg-[red] text-white mr-2"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="border rounded-full px-6 py-2 bg-[#4747fb] text-white"
            >
              Cancel
            </button>
            <button
              onClick={onAdd}
              className="border rounded-full px-6 py-2 bg-[#4747fb] text-white ml-2"
            >
              Thêm
            </button>
          </div>
        </div>


        <div className="w-full ">
          <div className="">
            {todos.map((todo: any) => (
              <div
              key={todo.id}
              className="flex justify-between text-center py-3"
              >
              <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
                <div className="flex">
                  <button
                    onClick={() => onEdit(todo.id, todo.title)}
                    className=" border rounded-full px-6 py-2 bg-[red] text-white mr-10"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="border rounded-full px-6 py-2 bg-[#4747fb] text-white"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App 