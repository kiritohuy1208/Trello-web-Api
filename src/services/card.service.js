import { CardModel } from "*/models/card.model";
import { ColumnModel } from "*/models/column.model";
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
// const update = async (id, data) => {
//   try {
//     const updateData = {
//       ...data,
//       updateAt: Date.now(),
//     };
//     const result = await CardModel.update(id, updateData);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
export const CardService = { createNew };
