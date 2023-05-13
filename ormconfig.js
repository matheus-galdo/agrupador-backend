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
    type: process.env.TEST_DB_DRIVE || "postgres",
    host: process.env.TEST_DB_HOST || "localhost",
    port: process.env.TEST_DB_PORT || 5432,
    username: process.env.TEST_DB_USERNAME || "postgres",
    password: process.env.TEST_DB_PASSWORD || "admin",
    database: process.env.TEST_DB_NAME || "postgres",
    // dropSchema: true
}


const prodConnection = {
    ...baseConfig,
    type: process.env.DB_DRIVE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "postgres"
}

module.exports = process.env.NODE_ENV === 'test' ? testConnection : prodConnection