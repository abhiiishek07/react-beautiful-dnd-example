import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import Column from "@/components/Column/Column";

const INITIAL_COLUMN_ORDER = ["column-1", "column-2", "column-3"];

const INITIAL_COL_DATA = {
  "column-1": {
    id: "column-1",
    title: "Column 1",
    itemsId: ["item-1", "item-2", "item-3"],
  },
  "column-2": {
    id: "column-2",
    title: "Column 2",
    itemsId: ["item-4", "item-5"],
  },
  "column-3": {
    id: "column-3",
    title: "Column 3",
    itemsId: ["item-6", "item-7", "item-8"],
  },
};

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Item 1",
  },
  "item-2": {
    id: "item-2",
    title: "Item 2",
  },
  "item-3": {
    id: "item-3",
    title: "Item 3",
  },
  "item-4": {
    id: "item-4",
    title: "Item 4",
  },
  "item-5": {
    id: "item-5",
    title: "Item 5",
  },
  "item-6": {
    id: "item-6",
    title: "Item 6",
  },
  "item-7": {
    id: "item-7",
    title: "Item 7",
  },
  "item-8": {
    id: "item-8",
    title: "Item 8",
  },
};

//add this if using next.js and keep the strict mode to false
export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {},
  };
}

export default function Home() {
  const [columnsOrder, setColumnsOrder] = useState(INITIAL_COLUMN_ORDER);
  const [data, setData] = useState(INITIAL_COL_DATA);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === "COLUMN") {
      //dragging the columns
      const reorderedColumns = [...columnsOrder];
      const [removedItem] = reorderedColumns.splice(sourceIndex, 1);
      reorderedColumns.splice(destinationIndex, 0, removedItem);

      setColumnsOrder(reorderedColumns);

      return;
    } else {
      //changes within same column
      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId;
        const new_items_id_collection = [...data[source_col_id].itemsId];
        const [deleted_item_id] = new_items_id_collection.splice(
          sourceIndex,
          1
        );
        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsId = new_items_id_collection;
        setData(new_data);
      } else {
        //changes within different col
        const source_col_id = source.droppableId,
          dest_col_id = destination.droppableId;

        const new_source_items_id_collc = [...data[source_col_id].itemsId];
        const new_dest_items_id_collc = [...data[dest_col_id].itemsId];
        const [deleted_item_id] = new_source_items_id_collc.splice(
          sourceIndex,
          1
        );

        new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsId = new_source_items_id_collc;
        new_data[dest_col_id].itemsId = new_dest_items_id_collc;

        setData(new_data);
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center  flex-col">
      <p className="font-bold text-4xl bg-gradient-to-r from-purple-600 via-blue-400 to-indigo-400  mt-10 text-transparent bg-clip-text">
        React Beautiful DND Example
      </p>

      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="HORIZONTAL">
          {(provided) => (
            <div
              className="flex items-center w-full max-w-6xl justify-center border min-h-96 py-4 mt-6 rounded-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder.map((col_id, index) => {
                const column_data = data[col_id];
                return (
                  <Draggable
                    draggableId={column_data.id}
                    key={column_data.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="rounded-md border flex flex-col  max-w-xs mx-3 "
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-80 gap-2  hover:bg-gray-600 p-4 border-b border-b-gray-700 rounded-t-md"
                        >
                          <p className="text-xl font-bold">
                            {column_data.title}
                          </p>
                        </div>

                        <Column {...column_data} ITEMS={ITEMS} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
