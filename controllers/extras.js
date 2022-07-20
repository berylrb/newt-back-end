import { Extra } from "../models/extra";

function create(req, res) {
  console.log('extra route')
  Extra.create(req.body)
    .then(extra => res.json(extra))
    .catch(err => res.json(err))
}


export {
  create
}