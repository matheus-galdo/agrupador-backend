import "reflect-metadata"
import connection from "../../src/database";

import { GroupServices } from "../../src/App/services/GroupServices";

describe('Create group', () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
    });


    it('should create a new group', async () => {

        const createGroupService = new GroupServices

        const mockData = {
            name: "Responde Ai",
            latitude: 5.44,
            longitude: 4.32,
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }


        let group: any = {
            name: null,
            latitude: null,
            longitude: null,
            invite_url: null
        }


        await createGroupService.create(mockData)
            .then(res => {
                group = res
            })
            .catch(err => {
                group = { message: err.message }
            })

        expect(group.message).toBeUndefined()
        expect(group.name).toBe(mockData.name)
        expect(group.latitude).toBe(mockData.latitude)
        expect(group.longitude).toBe(mockData.longitude)
        expect(group.invite_url).toBe(mockData.invite_url)
    })


    it("should fail on latitude absence", async () => {
        const createGroupService = new GroupServices

        const mockData = {
            name: "Responde Ai",
            latitude: null,
            longitude: 4.32,
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }


        let group: any = {
            name: null,
            latitude: null,
            longitude: null,
            invite_url: null
        }


        await createGroupService.create(mockData)
            .then(res => {
                group = res
            })
            .catch(err => {
                group = { message: err.message }
            })


        // console.log(group);

        // expect(group.name).toBe(mockData.name)
        // expect(group.name).toBe(mockData.name)
        expect(group.message).toBeDefined()
    })
})