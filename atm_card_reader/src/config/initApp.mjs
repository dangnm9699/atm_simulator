import cors from 'cors'
import env from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer'
import('express-async-errors')


env.config()
const initApp = app => {
    const forms = multer()
    app.use(morgan("combined"))
    app.use(forms.single("token"))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
}

export default initApp
