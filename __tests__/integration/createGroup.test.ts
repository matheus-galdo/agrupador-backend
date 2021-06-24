import "reflect-metadata"
import connection from "../../src/database";
import { GroupServices } from "../../src/App/services/GroupServices";

describe('Create group', () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        // await connection.clear();
        await connection.close();
    });

    afterEach(async () => {
        // await connection.clear();
    });


    it('should create a new group', async () => {

        const createGroupService = new GroupServices

        const mockData = {
            name: "Responde Ai",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }


        let created: any = { name: null, latitude: null, longitude: null, invite_url: null }

        await createGroupService.create(mockData)
            .then(res => { created = res })
            .catch(err => { created = { message: err.message } })


        expect(created.message).toBeUndefined()
        expect(created.name).toBe(mockData.name)
        expect(created.latitude).toBe(mockData.latitude)
        expect(created.longitude).toBe(mockData.longitude)
        expect(created.invite_url).toBe(mockData.invite_url)
        expect(created.created_at).toBeDefined()
        expect(created.updated_at).toBeDefined()
    })


    it("should fail on coords absence", async () => {
        const createGroupService = new GroupServices

        const mockData = {
            name: "Grupo de estudos de TI",
            latitude: null,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }


        let group: any = { name: null, latitude: null, longitude: null, invite_url: null }

        await createGroupService.create(mockData)
            .then(res => { group = res })
            .catch(err => { group = { message: err.message } })

        expect(group.message).toBeDefined()
    })


    it("should fail on creating duplicated group", async () => {
        const createGroupService = new GroupServices

        const mockData = {
            name: "Responde Ai",
            latitude: null,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let group: any = { name: null, latitude: null, longitude: null, invite_url: null }

        const AMMOUNT_OF_ATTEMPTS = 2

        for (let i = 1; i < AMMOUNT_OF_ATTEMPTS; i++) {
            await createGroupService.create(mockData)
                .then(res => { group = res })
                .catch(err => { group = { message: err.message } })
        }

        expect(group.message).toBeDefined()
    })
})