import Joi from "joi";
import { getDB } from "*/config/mongodb";

const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  }); // abortEarly: return full error
};
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);
    const newColumn = await getDB()
      .collection(columnCollectionName)
      .findOne(result.insertedId);

    return newColumn;
  } catch (e) {
    console.log(e);
  }
};
export const ColumnModel = { createNew };
