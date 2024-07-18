import { List } from "./list";
import { NewButton } from "./new-button";

/** eslint-disable react/jsx-no-undef */
export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] h-[calc(100vh-0.5rem)] w-[60px]  top-1 bottom-1 bg-blue-900 text-white flex flex-col p-3 gap-y-4 rounded-lg">
      <List />
      <NewButton />
    </aside>
  );
};
