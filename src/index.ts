import app from "./app";
import serverConfig from "./config/server.config";

app.listen(serverConfig.PORT, async () => {
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
});