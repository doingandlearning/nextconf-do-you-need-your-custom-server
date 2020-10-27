import { connectDb, models } from "../../../utils/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    connectDb()
    return await models.User.find({ username: req.query.username }, (err, user) => {
      if (err) {
        res.status(400)
        console.log(err)
        return res.send(err)
      }
      return res.send(user)
    })
  }
}