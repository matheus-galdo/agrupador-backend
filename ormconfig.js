const baseConfig = {
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/App/models/*.ts", "./src/App/models/*.js"],

    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "./src/App/models"
    }
}

const testConnection = {
    ...baseConfig,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "teste_test",
}


const prodConnection = {
    ...baseConfig,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "teste",
}


// console.log(process.env.NODE_ENV === 'test' ? testConnection : prodConnection);



module.exports = process.env.NODE_ENV === 'test' ? testConnection : prodConnection