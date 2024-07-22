const { UserRepository } = require("../repositories/index");
const {
  GenerateSalt,
  GeneratePassword,
  GenerateSignature,
  ValidatePassword,
} = require("../utils/index");

const userRepository = new UserRepository();

async function registerUser(req) {
  try {
    const { email, password, phoneNumber, userName } = req.body;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    let salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    const response = await userRepository.createUser({
      email,
      userName,
      password: hashedPassword,
      phoneNumber,
      salt,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
      picturePath: req.file.originalname,
    });

    if (!response) throw new Error("User not created");

    const token = await GenerateSignature({
      _id: response._id,
      email,
    });

    return { response, token };
  } catch (error) {
    throw Error(error);
  }
}

async function signInUser(req) {
  try {
    const { email, password } = req.body;
    console.log(email, password, req);
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      const isPasswordCorrect = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );
      if (!isPasswordCorrect) {
        throw new Error("Password is incorrect");
      }

      const token = await GenerateSignature({
        _id: existingUser._id,
        email,
      });

      return { existingUser, token };
    }
    throw new Error("Email does not exist ");
  } catch (error) {
    throw new Error(error);
  }
}

async function getUsers(req) {
  try {
    const pageNum = req.query?.pageNum ? +req.query?.pageNum : 0;
    const pageSize = req.query?.pageSize ? +req.query?.pageSize : 10;
    const filter = {};

    const users = await userRepository.getUsers(filter, pageNum, pageSize);
    if (!users) throw new Error("Users not found");
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function getUserById(req) {
  try {
    const id = req.params.id;
    if (req.query?.friends == "1") {
      return await userRepository.getUserByIdWithFriends(id);
    }
    const existingUser = await userRepository.getUserById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return existingUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function getPostUsers(req) {
  try {
    const response = {
      userId: [],
      likes: [],
      savedBy: [],
    };
    console.log(req.body);
    const flatenReq = [
      ...new Set([
        ...req.body.userId.flat(),
        ...req.body.likes.flat(),
        ...req.body.savedBy.flat(),
      ]),
    ];

    const users = await userRepository.getUsers({
      _id: { $in: flatenReq },
    });

    const usersMap = new Map(users.map((user) => [user._id.toString(), user]));

    response.userId = req.body.userId.map((id) => usersMap.get(id) || null);
    response.likes = req.body.likes.map((innerArray) =>
      innerArray.map((id) => usersMap.get(id) || null)
    );
    response.savedBy = req.body.savedBy.map((innerArray) =>
      innerArray.map((id) => usersMap.get(id) || null)
    );

    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUser(req) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await userRepository.updateUser(id, data);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUser(req) {
  try {
    const id = req.params.id;
    const deletedUser = await userRepository.deleteUser(id);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function addRemoveFriend(req) {
  const { userId, friendId } = req.params;

  if (!userId || !friendId) {
    throw new Error("UserId and friendId are required");
  }

  const user = await userRepository.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.friends.includes(friendId)) {
    return await userRepository.removeFriend(userId, friendId);
  }

  return await userRepository.addFriends(userId, friendId);
}

async function subscribeEvent(payload) {
  payload = JSON.parse(payload);
  const { data, userId, action } = payload;

  switch (action) {
    case "ADD_POST_TO_SAVE":
      await userRepository.addPostToSaveBy(userId, data);
      break;
    case "REMOVE_POST_FROM_SAVE":
      await userRepository.removePostFromSaveBy(userId, data);
      break;
    case "ADD_POST_TO_LIKE":
      await userRepository.addPostToLikes(userId, data);
      break;
    case "REMOVE_POST_FROM_LIKE":
      await userRepository.removePostFromLikes(userId, data);
      break;
    case "ADD_COMMENT":
      await userRepository.addComment(userId, data);
      break;
    case "REMOVE_COMMENT":
      await userRepository.removeComment(userId, data);
      break;
    default:
      break;
  }
}

module.exports = {
  registerUser,
  signInUser,
  getUsers,
  getUserById,
  getPostUsers,
  updateUser,
  deleteUser,
  addRemoveFriend,
  subscribeEvent,
};
