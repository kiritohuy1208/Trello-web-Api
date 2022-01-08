import Joi from "joi";
import { getDB } from "*/config/mongodb";

const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  }); // abortEarly: return full error
};
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);
    const newCard = await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardModel = { createNew };
