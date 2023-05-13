import "reflect-metadata"
import connection from "./database";
import { createServer } from './App/app'

connection.create();
const app = createServer();
app.listen(process.env.PORT || 5000, () => console.log('server is running'))