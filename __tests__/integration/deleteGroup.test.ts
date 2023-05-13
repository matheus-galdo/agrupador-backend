import "reflect-metadata"
import connection from "../../src/database";

import { GroupServices } from "../../src/App/services/GroupServices";

describe('Delete groups', () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.clear();
        await connection.close();
    });

    afterEach(async () => {
        // await connection.clear();
    });



    it('Should delete a group', async () => {

        const groupService = new GroupServices

        const mockData = {
            name: "Study group to be deleted",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { id: null, name: null, latitude: null, longitude: null, invite_url: null }

        //create a group
        await groupService.create(mockData)
            .then(res => { createdGroup = res })
            .catch(err => { createdGroup = { message: err.message } })


        let deletedGroup = {message: null}

        //delete the created group
        await groupService.delete(createdGroup.id)
            .then(res => { deletedGroup = res })
            .catch(err => { deletedGroup = err })

        expect(deletedGroup.message.indexOf('excluído')).toBeGreaterThan(1)
    })


    it("should fail on deleting a not found group", async () => {

        const groupService = new GroupServices

        const mockData = {
            name: "Group to fail on deleting",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { id: null, name: null, latitude: null, longitude: null, invite_url: null }

        //create a group
        await groupService.create(mockData)
            .then(res => { createdGroup = res })
            .catch(err => { createdGroup = { message: err.message } })


        let deletedGroup = {message: null}
        const NO_GROUP_ID = 100

        //delete the created group
        await groupService.delete(NO_GROUP_ID)
            .then(res => { deletedGroup = res })
            .catch(err => { deletedGroup = err })

        expect(deletedGroup.message.indexOf('excluído')).toBeLessThan(0)
    })
})