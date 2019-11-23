const extractor = require("../extractors/user_extractor");
const router = require("express").Router();

async function getAllUsers(request, response) {
  try {
    let result = await extractor.list();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getOneUser(request, response) {
  let user_id = request.params.user_id;
  try {
    let result = await extractor.retrieve(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function putChangedUser(request, response) {
  let user_id = request.params.user_id;
  let { user_id: _, ...user_obj } = request.body
  try {
    let result = await extractor.update(user_id, user_obj);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function postNewUser(request, response) {
  try {
    let result = await extractor.create(request.body);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function deleteOldUser(request, response) {
  let user_id = request.params.user_id;
  try {
    let result = await extractor.delete(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

router.post("/", postNewUser);
router.get("/", getAllUsers);
router.get("/:user_id(\\d+)/", getOneUser);
router.put("/:user_id(\\d+)/", putChangedUser);
router.delete("/:user_id(\\d+)", deleteOldUser);

module.exports = router;
