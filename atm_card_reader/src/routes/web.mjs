import express from "express"
import createError from 'http-errors'
import * as cardController from '../controllers/card.controller.mjs'


const router = express.Router()
const initRoutes = app => {
    router.post("/read_card/encode", cardController.encode)
    router.post("/read_card/decode", cardController.validCardToken, cardController.decode)

    app.use("/api/v1/", router)
    app.use((req, res, next) => {
        next(createError(404))
    })
    app.use((err, req, res) => {
        console.log(err.stack);
        res.status(err.status || 500).send(err.message)
    })
}

export default initRoutes
