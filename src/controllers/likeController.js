

export async function toggleLikePost(req, res) {
  const { postId } = req.params;

  const { userId } = res.locals;
  
  try {
    // TODO
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}