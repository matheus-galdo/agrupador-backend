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
            throw new Error(`O grupo ${name} já existe. Crie um grupo com outro nome`);
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
            throw new Error(`O grupo ${name} já existe. Crie um grupo com outro nome`);
        }

        try {

            const result = await groupRepository.update(id, { name, latitude, longitude, invite_url, description })

            if (result.affected === 1) return { message: `Grupo ${id} atualizado com sucesso` }

            throw new Error(`Erro ao atualizar o grupo ${id}`);

        } catch (error) {
            throw error
        }
    }

    async delete(id: any): Promise<{ message: string; }> {

        const groupRepository = getCustomRepository(GroupRepositories)

        try {

            const findedGroup = await groupRepository.findOne(id)

            if (!findedGroup) throw new Error(`Grupo ${id} não encontrado`);

            let result = await groupRepository.delete(id)

            if (result.affected === 1) return { message: `Grupo ${findedGroup.name} excluído` }

            throw new Error(`Erro ao excluir o grupo ${id}`);

        } catch (error) {
            throw error
        }
    }

    validateGroupData({ name, latitude, longitude, invite_url, description }) {
        if (!name) {
            throw new Error("o campo nome deve estar presente");
        }

        if (!latitude) {
            throw new Error("o latitude nome deve estar presente");
        }

        if (!longitude) {
            throw new Error("o campo longitude deve estar presente");
        }

        if (!invite_url) {
            throw new Error("o campo link do convite deve estar presente");
        }

        if (!validUrl.isWebUri(invite_url)) {
            throw new Error("o campo link do convite deve ser um URL válido");
        }

        if (!this.isWhatsappUri(invite_url)) {
            throw new Error("o campo link do convite deve ser um link de um grupo do whatsapp válido");
        }

        if (!description) {
            throw new Error("o campo descrição deve estar presente");
        }
    }

    isWhatsappUri(url: string) {
        return validUrl.isWebUri(url) && (url.search(/http(s)?:\/\/chat.whatsapp.com\/[A-z1-9]+/) >= 0)
    }


}

export { GroupServices }