import "reflect-metadata"
import connection from "../../src/database";

import { GroupServices } from "../../src/App/services/GroupServices";

describe('Update groups', () => {
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



    it('Should update a group', async () => {

        const groupService = new GroupServices

        const mockData = {
            name: "Study group to be edited",
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


        const newName = "New group name"

        //update the created group
        let updatedGroups = await groupService.update(createdGroup)
            .then(res => updatedGroups = { ...res, name: newName })
            .catch(err => updatedGroups = { message: err.message })

        expect(updatedGroups.message.indexOf('sucesso')).toBeGreaterThan(1)
        expect(updatedGroups.description).toBe(mockData.description)
        expect(updatedGroups.name).toBe(newName)
    })


    it("should fail on any data absence", async () => {

        const groupService = new GroupServices

        const mockData = {
            name: "Group to be edited",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { id: null, name: null, latitude: null, longitude: null, invite_url: null }

        //create a new group
        await groupService.create(mockData)
            .then(res => { createdGroup = { id: res.id, name: res.name } })
            .catch(err => { createdGroup = { message: err.message } })

        //update groups data
        let updatedGroups = await groupService.update(createdGroup)
            .then(res => updatedGroups = res)
            .catch(err => updatedGroups = { message: err.message })

        expect(updatedGroups.message).toBeDefined()
    })


    it("should fail on update a group with an existing name", async () => {

        const groupService = new GroupServices

        const mockData = [
            { name: "Study Group far away", latitude: 5.44, longitude: 4.32, description: "teste", invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS" },
            { name: "Study Group nearby", latitude: 5.44, longitude: 4.32, description: "teste", invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS" }
        ]

        let lastCreatedGroup: any = { name: null, latitude: null, longitude: null, invite_url: null }

        //create some groups
        mockData.forEach(async mock => {
            await groupService.create(mock)
                .then(res => { lastCreatedGroup = { name: "Study Group far away", ...res } })
                .catch(err => { lastCreatedGroup = { message: err.message } })
        })

        //update groups data
        let updatedGroups = await groupService.update(lastCreatedGroup)
            .then(res => updatedGroups = res)
            .catch(err => updatedGroups = { message: err.message })

        expect(updatedGroups.message).toBeDefined()
    })
})