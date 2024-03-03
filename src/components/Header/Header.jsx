import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-gray-700 px-8">
      <div className="flex-1">
        <p className="italic text-3xl px-8">Abhishek</p>
      </div>

      <button className="btn btn-primary  px-7 ">
        <a
          href="https://abhiiishek07.medium.com/kanban-board-multi-list-drag-and-drop-with-react-beautiful-dnd-in-next-js-12b73c32e938"
          target="_blank"
        >
          Blog Tutorial
        </a>
      </button>
    </div>
  );
};

export default Header;
