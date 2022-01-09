import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";
import { ObjectId } from "mongodb";
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false }); // abortEarly: return full error
};
const getOne = async (boardId) => {
  try {
    const board = await getDB()
      .collection(boardCollectionName)
      .findOne(boardId);
    return board;
  } catch (e) {
    throw Error(e);
  }
};
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    const newBoard = await getDB()
      .collection(boardCollectionName)
      .findOne(result.insertedId);
    return newBoard;
  } catch (e) {
    throw Error(e);
  }
};
const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { upsert: true, returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {string} id
 * @param {string} columnId
 */
const pushColumnOrder = async (id, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $push: { columnOrder: columnId } },
        { upsert: true, returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};
const getFullBoard = async (boardId) => {
  try {
    //const value = await validateSchema(boardId);
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
          },
        },
        // {
        //   $addFields: {
        //     // overwrite id when query
        //     _id: { $toString: "$_id" },
        //   },
        // },
        {
          $lookup: {
            // left join
            from: ColumnModel.columnCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            // left join
            from: CardModel.cardCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (e) {
    throw Error(e);
  }
};
export const BoardModel = {
  createNew,
  getFullBoard,
  update,
  getOne,
  pushColumnOrder,
};
