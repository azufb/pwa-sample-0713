import { LOCAL_STORAGE_NAME } from "../../../CONST";
import { Dispatch, SetStateAction, useState } from "react";
import { TodoItem, TodoListPresenter } from "./TodoListPresenter";

interface TodoListProps {
  todoList: TodoItem[];
  setTodoList: Dispatch<SetStateAction<TodoItem[]>>;
}

export function TodoList({ todoList, setTodoList }: TodoListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAllModalOpen, setIsAllModalOpen] = useState<boolean>(false);
  const [todoIndex, setTodoIndex] = useState<number>(NaN);
  /**
   * Todo削除
   */
  const deleteItem = (id: number): void => {
    const deleteTodo: TodoItem = todoList[id];
    const deletedTodoList: TodoItem[] = todoList.filter(
      (_, index) => index !== id
    );
    const stringify: string = JSON.stringify(deletedTodoList);
    localStorage.setItem(LOCAL_STORAGE_NAME, stringify);

    setTodoList(deletedTodoList);

    setIsOpen(false);

    alert(Notification.permission);

    if (Notification.permission === "granted") {
      alert("通知可能");
      navigator.serviceWorker.ready.then((registration) => {
        alert(registration);
        if (registration.active) {
          registration.active.postMessage("hello!");
        } else {
          alert("registration not active");
        }
      });
    }
  };

  /**
   * Todo一括削除
   */
  const deleteAll = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);

    setTodoList([]);

    // 一括削除モーダル閉じる
    setIsAllModalOpen(false);
  };
  /**
   * モーダル開く
   */
  const openModal = (index: number): void => {
    setIsOpen(true);
    setTodoIndex(index);
  };

  /**
   * モーダル閉じる
   */
  const closeModal = (): void => {
    setIsOpen(false);
  };

  /**
   * 一括削除モーダルの開閉制御
   */
  const handleAllModal = (): void => {
    setIsAllModalOpen(!isAllModalOpen);
  };

  return (
    <TodoListPresenter
      todoList={todoList}
      deleteItem={deleteItem}
      isOpen={isOpen}
      openModal={openModal}
      todoIndex={todoIndex}
      closeModal={closeModal}
      deleteAll={deleteAll}
      isAllModalOpen={isAllModalOpen}
      handleAllModal={handleAllModal}
    />
  );
}
