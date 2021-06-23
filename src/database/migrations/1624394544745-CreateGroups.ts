import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGroups1624394544745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "groups",
                columns: [
                    { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'text', isUnique: true},
                    { name: 'latitude', type: 'float' },
                    { name: 'longitude', type: 'float' },
                    { name: 'invite_url', type: 'text' },
                    { name: 'created_at', type: 'timestamp', default: "now()" },
                    { name: 'updated_at', type: 'timestamp', default: "now()" }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("groups")
    }

}
