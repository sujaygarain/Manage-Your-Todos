
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  const fetchTodos = async () => {
    if (!currentUser) return;

    const todosCollectionRef = collection(db, "todos");
    const q = query(todosCollectionRef, where("userId", "==", currentUser.uid));
    const data = await getDocs(q);

    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addTodo = async (todo) => {
    if (!currentUser) return;

    const todosCollectionRef = collection(db, "todos");
    const newTodo = { ...todo, userId: currentUser.uid };
    const docRef = await addDoc(todosCollectionRef, newTodo);
    setTodos((prev) => [{ ...newTodo, id: docRef.id }, ...prev]);
  };

  const updateTodo = async (id, updatedTodo) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, updatedTodo);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const updatedTodo = { completed: !todo.completed };
    updateTodo(id, updatedTodo);
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};


