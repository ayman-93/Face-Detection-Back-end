const getProfile = (res, req, db) => {
  const { id } = req.params;
  console.log(id);
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("User no found");
      }
    })
    .catch(error => res.status(400).json("Error geting the user"));
};

export default getProfile;
