import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";

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
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    const newCard = await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {Array id} ids
 */
const deleteMany = async (ids) => {
  try {
    const tranformIds = ids.map((i) => ObjectId(i));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany(
        {
          _id: { $in: tranformIds },
        },
        {
          $set: { _destroy: true },
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    let dataHandle = {
      ...data,
    };
    if (data.boardId) dataHandle.boardId = ObjectId(data.boardId);

    if (data.columnId) dataHandle.columnId = ObjectId(data.columnId);
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: dataHandle },
        { upsert: true, returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardModel = { createNew, cardCollectionName, deleteMany, update };
