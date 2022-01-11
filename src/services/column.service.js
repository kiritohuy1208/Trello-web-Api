import { ColumnModel } from "*/models/column.model";
import { BoardModel } from "*/models/board.model";
import { CardModel } from "*/models/card.model";
const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data);
    result.cards = [];
    // update columnOrder in board after create new column:
    await BoardModel.pushColumnOrder(
      result.boardId.toString(),
      result._id.toString()
    );
    return result;
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
    if (updateData.cards) delete updateData.cards;
    const result = await ColumnModel.update(id, updateData);
    // update if update _destroy:
    if (result._destroy) {
      CardModel.deleteMany(result.cardOrder);
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const ColumnService = { createNew, update };
