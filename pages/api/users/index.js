import { connectDb, models } from "../../../utils/db"
import auth0 from "../../../utils/auth0"

async function handler(req, res) {
  if (req.method === "GET") {
    connectDb()
    const response = await models.User.find({}, (err, users) => {
      if (err) {
        res.status(400)
        console.log(err)
        return err
      }
      return users
    })
    return res.send(response)
  }

  if (req.method === "POST") {
    connectDb()
    if (!req.body) {
      return res.status(400).json({ message: "You need to send a user object." })
    }
    return await models.User.create(req.body, (err, user) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.send(user)
    })
  }
}

export default auth0.requireAuthentication(handler)