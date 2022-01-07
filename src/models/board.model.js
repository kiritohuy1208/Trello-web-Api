import Joi from "joi";
import { getDB } from "*/config/mongodb";

const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false }); // abortEarly: return full error
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
    console.log(e);
  }
};
export const BoardModel = { createNew };
