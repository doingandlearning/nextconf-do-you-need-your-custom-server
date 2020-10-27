import auth0 from '../../utils/auth0';

function handler(req, res) {
  console.log(process.env.SECRET_API_KEY)
  return res.json({ message: "It's really fine here." })
}

export default auth0.requireAuthentication(handler)