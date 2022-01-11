import { CardModel } from "*/models/card.model";
import { ColumnModel } from "*/models/column.model";
import { ColumnService } from "*/services/column.service";
const createNew = async (data) => {
  try {
    const result = await CardModel.createNew(data);
    // update cardOrder in  column
    await ColumnModel.pushCardOrder(
      result.columnId.toString(),
      result._id.toString()
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    console.log(data);
    const updateCard = {
      ...data.cardupdate,
      updateAt: Date.now(),
    };
    const updateColumn = {
      ...data.columnUpdate,
      updateAt: Date.now(),
    };
    if (updateCard._id) delete updateCard._id;
    const result = await CardModel.update(id, updateCard);
    ColumnService.update(updateColumn._id, updateColumn);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardService = { createNew, update };
