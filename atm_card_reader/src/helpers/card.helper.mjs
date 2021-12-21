import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import env from 'dotenv'
import fs from 'fs'


env.config()

const sign = promisify(jwt.sign).bind(jwt)
const verify = promisify(jwt.verify).bind(jwt)

const privateKey = fs.readFileSync('private.key').toString()

const generateToken = async (payload, secretSignature = privateKey, tokenLife = process.env.CARD_TOKEN_LIFE) => {
    try {
        return await sign(
            { payload },
            secretSignature,
            {
                algorithm: 'HS512',
                expiresIn: tokenLife,
            }
        )
    } catch (error) {
        console.log(error)
        return null
    }
}

const decodeToken = async (token, secretKey = privateKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true
        })
    } catch (error) {
        console.log(error)
        return null
    }
}

const verifyToken = async (token, secretKey = privateKey) => {
    try {
        return await verify(token, secretKey)
    } catch (error) {
        console.log(error)
        return null
    }
}

export {
    generateToken,
    decodeToken,
    verifyToken
}
