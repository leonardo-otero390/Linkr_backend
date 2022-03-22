export async function createUser(req, res) {
  const newUser = req.body;

  res.send(newUser);
}
