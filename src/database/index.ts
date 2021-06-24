import { createConnection, getConnection} from 'typeorm';

const connection = {
    async create() {
        await createConnection().then(dbConnection => {
            return { message: 'database connection created sucessfuly' }
        }).catch(err => {
            return { message: 'error conecting to database', err }
        });
    },

    async close() {
        await getConnection().close().then(dbConnection => {
            return { message: 'database connection closed sucessfuly' }
        }).catch(err => {
            return { message: 'error closing connection to database', err }
        });
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        entities.forEach(async (entity) => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.name}`);
        });

        // await connection.query(`DELETE FROM migrations`);
    },

    async freshDB() {
        const connection = getConnection();
        await connection.query(`DROP table migrations`);
        await connection.query(`DROP table groups`);
    },
};


export default connection;