import { BoardModel } from "*/models/board.model";
import { cloneDeep } from "lodash";
const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// const getOne = async (boardId) => {
//   try {
//     const result = await BoardModel.getOne(boardId);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);
    if (!board || !board.columns) {
      throw new Error("Board not found");
    }
    const cloneBoard = cloneDeep(board);
    cloneBoard.columns = cloneBoard.columns.filter((col) => !col._destroy);
    //add card to each column
    cloneBoard.columns.forEach(
      (column) =>
        (column.cards = cloneBoard.cards.filter(
          (card) => card.columnId.toString() === column._id.toString()
        ))
    );
    //remove cards
    delete cloneBoard.cards;
    return cloneBoard;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;
    const result = await BoardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const BoardService = { createNew, getFullBoard, update /*, getOne */ };
