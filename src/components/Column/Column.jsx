import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ itemsId, id, ITEMS }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full min-h-60 h-fit"
        >
          {itemsId.map((item_id, index) => {
            const item = ITEMS[item_id];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="border-b  rounded-md flex flex-col p-2 m-2 bg-pink-500"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <p className="font-bold text-lg ">{item.title}</p>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
