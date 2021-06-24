import "reflect-metadata"
import connection from "../../src/database";

import { GroupServices } from "../../src/App/services/GroupServices";

describe('List existing groups', () => {
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



    it('Should list nearby groups', async () => {

        const groupService = new GroupServices

        const current_coords = { latitude: 5.44, longitude: 4.32 }

        const mockData = {
            name: "Group Nearby",
            ...current_coords,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { name: null, latitude: null, longitude: null, invite_url: null }

        //create a nearby group
        await groupService.create(mockData)
            .then(res => { createdGroup = res })
            .catch(err => { createdGroup = { message: err.message } })

        //get all groups nearby
        let groupsNearby = await groupService.index(current_coords)
            .then(res => groupsNearby = res)
            .catch(err => groupsNearby = { message: err.message })

        expect(groupsNearby.message).toBeUndefined()
        expect(groupsNearby.length).toBeGreaterThan(0)
        expect(groupsNearby.find(group => group.name === mockData.name)).toBeDefined()
    })


    it("should fail on coords absence", async () => {

        const groupService = new GroupServices

        const current_coords = { latitude: null, longitude: null }

        const mockData = {
            name: "Study Group Nearby",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { name: null, latitude: null, longitude: null, invite_url: null }

        //create a nearby group
        await groupService.create(mockData)
            .then(res => { createdGroup = res })
            .catch(err => { createdGroup = { message: err.message } })

        //get all groups nearby
        let groupsNearby = await groupService.index(current_coords)
            .then(res => groupsNearby = res)
            .catch(err => groupsNearby = { message: err.message })

        expect(groupsNearby.message).toBeDefined()
    })


    it("should not find any group nearby", async () => {

        const groupService = new GroupServices

        const current_coords = { latitude: 5.30, longitude: 4.40 }

        const mockData = {
            name: "Study Group far away",
            latitude: 5.44,
            longitude: 4.32,
            description: "teste",
            invite_url: "https://chat.whatsapp.com/IjRxEDoaSXcF1lvODmnjyS"
        }

        let createdGroup: any = { name: null, latitude: null, longitude: null, invite_url: null }

        //create a group far away
        await groupService.create(mockData)
            .then(res => { createdGroup = res })
            .catch(err => { createdGroup = { message: err.message } })

        //get all groups nearby
        let groupsNearby = await groupService.index(current_coords)
            .then(res => groupsNearby = res)
            .catch(err => groupsNearby = { message: err.message })


        expect(groupsNearby.message).toBeUndefined()
        expect(groupsNearby.length).toBe(0)
    })
})