const serializer = require("../db/user_serializer");
const express = require("express");
const router = express.Router();

async function getAllUsers(request, response) {
  try {
    let result = await serializer.list();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getOneUser(request, response) {
  let user_id = request.params.user_id;
  try {
    let result = await serializer.retrieve(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function putUser(request, response) {
  let user_id = request.params.user_id;
  try {
    let result = await serializer.update(user_id, request.body);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function postNewUser(request, response) {
  try {
    let result = await serializer.create(request.body);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function deleteUser(request, response) {
  let user_id = request.params.user_id;
  try {
    let result = await serializer.delete(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

router.post("/", postNewUser);
router.get("/", getAllUsers);
router.get("/:user_id(\\d+)/", getOneUser);
router.put("/:user_id(\\d+)/", putUser);
router.delete("/:user_id(\\d+)", deleteUser);

module.exports = router;
