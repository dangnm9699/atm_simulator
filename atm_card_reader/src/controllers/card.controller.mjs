import bcrypt from 'bcrypt'
import env from 'dotenv'
import * as cardHelpers from '../helpers/card.helper.mjs'
import { body, validationResult } from 'express-validator'


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
    const errors = validationResult(req).errors
    if (errors.length > 0) {
        return res.status(400).send('Incorrect format.')
    }
    const { token } = req.body
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

const validCardToken = [
    body('token').not().isEmpty().trim().escape()
]

export {
    encode,
    decode,
    validCardToken
}
