import { getCustomRepository, getRepository } from "typeorm"
import { Group } from "../models/Group";
import GroupRepositories from "../repositories/GroupRepositories";
import validUrl from 'valid-url'

interface GroupRequestInterface {
    name: string;
    latitude: number;
    longitude: number;
    invite_url: string;
    description: string;
}

interface UpdateGroupRequestInterface {
    id: any;
    name: string;
    latitude: number;
    longitude: number;
    invite_url: string;
    description: string;
}



class GroupServices {

    async index(): Promise<Group[]> {
        const groupRepository = getCustomRepository(GroupRepositories)

        const groups = await groupRepository.find()

        return groups
    }

    async create({ name, latitude, longitude, invite_url, description }: GroupRequestInterface): Promise<Group> {

        this.validateGroupData({ name, latitude, longitude, invite_url, description })

        const groupRepository = getCustomRepository(GroupRepositories)

        const groupAlreadyExists = await groupRepository.findOne({ name })

        if (groupAlreadyExists) {
            throw new Error("group Already Exists");
        }

        const group = groupRepository.create({ name, latitude, longitude, invite_url, description })

        await groupRepository.save(group)

        return group;
    }

    async show(id: any): Promise<Group> {

        const groupRepository = getCustomRepository(GroupRepositories)

        const group = await groupRepository.findOne(id)

        if (!group) {
            throw new Error(`groups ${id} not found`);
        }

        return group
    }

    async update({ id, name, latitude, longitude, invite_url, description }: UpdateGroupRequestInterface): Promise<{ message: string; }> {

        this.validateGroupData({ name, latitude, longitude, invite_url, description })

        const groupRepository = getCustomRepository(GroupRepositories)

        const storedGroup = await groupRepository.findOne(id)
        const groupAlreadyExists = await groupRepository.findOne({ name })


        if (groupAlreadyExists && storedGroup.id !== groupAlreadyExists.id) {
            throw new Error("group Already Exists");
        }

        try {

            const result = await groupRepository.update(id, { name, latitude, longitude, invite_url, description })

            if (result.affected === 1) return { message: `group ${id} sucessfully updated` }

            throw new Error(`Error updating group ${id}`);

        } catch (error) {
            throw error
        }
    }

    async delete(id: any): Promise<{ message: string; }> {

        const groupRepository = getCustomRepository(GroupRepositories)

        try {

            const findedGroup = await groupRepository.findOne(id)

            if (!findedGroup) throw new Error(`Group ${id} not found`);

            let result = await groupRepository.delete(id)

            if (result.affected === 1) return { message: `group ${id} sucessfully deleted` }

            console.log();

            throw new Error(`Error deleting group ${id}`);

        } catch (error) {
            throw error
        }
    }

    validateGroupData({ name, latitude, longitude, invite_url, description }) {
        if (!name) {
            throw new Error("name must be present");
        }

        if (!latitude) {
            throw new Error("latitude must be present");
        }

        if (!longitude) {
            throw new Error("longitude must be present");
        }

        if (!invite_url) {
            throw new Error("invite_url must be present");
        }

        // if (!validUrl) {
        //     throw new Error("invite_url must be present");
        // }

        

        if (!description) {
            throw new Error("description must be present");
        }
    }

}

export { GroupServices }