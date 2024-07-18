import { List } from "./list";
import { NewButton } from "./new-button";

/** eslint-disable react/jsx-no-undef */
export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] h-[calc(100vh-1rem)] w-[60px]  top-3 bottom-2 bg-teal-900 text-white flex flex-col p-3 gap-y-4 rounded-lg">
      <List />
      <NewButton />
    </aside>
  );
};
