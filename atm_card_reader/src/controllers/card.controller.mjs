import bcrypt from 'bcrypt'
import env from 'dotenv'
import * as cardHelpers from '../helpers/card.helper.mjs'


env.config()

const encode = async (req, res) => {
    const { cardNumber, name, gender, citizenId } = req.body
    const dataForCardToken = {
        cardNumber,
        name,
        gender,
        citizenId
    }
    const cardToken = await cardHelpers.generateToken(dataForCardToken)
    if (!cardToken) return res.status(400).send("Cannot encode. Try again")
    return res.send(cardToken)
}

const decode = async (req, res) => {
    const { buffer } = req.file
    const token = buffer.toString().trim()
    const decoded = await cardHelpers.decodeToken(token)
    if (!decoded) {
        return res.status(400).send('Incorrect token. Try again')
    }
    const {
        cardNumber,
        name,
        gender,
        citizenId
    } = decoded.payload
    return res.json({
        cardNumber,
        name,
        gender,
        citizenId
    })
}

const validCardToken = (req, res, next) => {
    const { mimetype, size } = req.file
    const types = ["application/json", "application/octet-stream", "text/plain"]
    if (types.includes(mimetype) && size <= 1000) {
        next()
    } else {
        return res.status(400).send("Only accept json, txt, stream file types. File size less than 1KB.")
    }
}

export {
    encode,
    decode,
    validCardToken
}
