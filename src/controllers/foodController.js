import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

export const getData = async (req, res) => {
  try {
    const likeData = await model.like_res.findAll({
      attributes: ["user_id", "res_id", "Date_like"],
    });

    responseData(res, "Successful", likeData, 200);
  } catch {
    responseData(res, "Error", "", 500);
  }
};

export const likeRestaurant = async (req, res) => {
  const { user_id, res_id } = req.body;
  try {
    const checkLiked = await model.like_res.findOne({
      attributes: ["user_id", "res_id", "Date_like"],
      where: { user_id, res_id },
    });

    if (checkLiked) {
      responseData(res, "Already liked this restaurant", "", 400);
    } else {
      const newLike = await model.like_res.create(
        {
          user_id,
          res_id,
          Date_like: new Date(),
        },
        {
          fields: ["user_id", "res_id", "Date_like"],
        }
      );

      responseData(res, "Liked successfully", newLike, 200);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Error from like status", "", 500);
  }
};

export const unlikeRestaurant = async (req, res) => {
  const { user_id, res_id } = req.body;

  try {
    const checkLiked = await model.like_res.findOne({
      attributes: ["user_id", "res_id", "Date_like"],
      where: { user_id, res_id },
    });

    if (!checkLiked) {
      responseData(res, "Liked this restaurant", "", 400);
    } else {
      await model.like_res.destroy({
        where: { user_id, res_id },
      });

      responseData(res, "Unliked successfully", "", 200);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Error from like status", "", 500);
  }
};

export const getUserLikes = async (req, res) => {
  const { user_id } = req.body;
  try {
    const userLikes = await model.like_res.findAll({
      attributes: ["user_id", "res_id", "Date_like"],
      where: { user_id },
    });

    responseData(res, "User likes retrieved successfully", userLikes, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Error from getting user likes", "", 500);
  }
};

export const getResLikes = async (req, res) => {
  const { res_id } = req.body;
  try {
    const resLikes = await model.like_res.findAll({
      attributes: ["user_id", "res_id", "Date_like"],
      where: { res_id },
    });

    responseData(res, "User get likes successfully", resLikes, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Error from getting user likes", "", 500);
  }
};

export const ResRating = async (req, res) => {
  const { user_id, res_id, amount } = req.body;

  try {
    const checkRating = await model.rate_res.findOne({
      attributes: ["user_id", "res_id", "amount", "date_rate"],
      where: { user_id, res_id },
    });

    if (checkRating) {
      responseData(res, "Already rated this restaurant", "", 400);
    } else {
      const newRating = await model.rate_res.create(
        {
          user_id,
          res_id,
          amount,
          date_rate: new Date(),
        },
        {
          fields: ["user_id", "res_id", "amount", "date_rate"],
        }
      );

      responseData(res, "Rated successfully", newRating, 200);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Error from adding restaurant rating", "", 500);
  }
};

export const getUserRatings = async (req, res) => {
  const { user_id } = req.body;

  try {
    const userRatings = await model.rate_res.findAll({
      attributes: ["user_id", "res_id", "amount", "date_rate"],
      where: { user_id },
    });

    responseData(res, "Get ratings successfully", userRatings, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Error from getting user ratings", "", 500);
  }
};

export const getRestaurantRatings = async (req, res) => {
  const { res_id } = req.body;

  try {
    const restaurantRatings = await model.rate_res.findAll({
      attributes: ["user_id", "res_id", "amount", "date_rate"],
      where: { res_id },
    });

    responseData(
      res,
      "Restaurant got ratings successfully",
      restaurantRatings,
      200
    );
  } catch (error) {
    console.error(error);
    responseData(res, "Error getting restaurant ratings", "", 500);
  }
};

export const addOrder = async (req, res) => {
  const { user_id, food_id, amount, code, arr_sub_id } = req.body;
  try {
    const newOrder = await model.order_food.create(
      {
        user_id,
        food_id,
        amount,
        code,
        arr_sub_id,
      },
      {
        fields: ["user_id", "food_id", "amount", "code", "arr_sub_id"],
      }
    );

    responseData(res, "Order added ", newOrder, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Error from adding order", "", 500);
  }
};
