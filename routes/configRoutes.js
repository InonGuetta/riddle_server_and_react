import riddlesRouter from "./riddles.routes.js";

function configRoutes(app) {
    app.use("/",riddlesRouter)
}

export default configRoutes
