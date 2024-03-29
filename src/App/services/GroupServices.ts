import { getCustomRepository, getRepository } from "typeorm"
import { Group } from "../models/Group";
import GroupRepositories from "../repositories/GroupRepositories";
import validUrl from 'valid-url'


interface GroupIndexRequestInterface {
    latitude: number;
    longitude: number;
}


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

    /**
     * Return a list of groups nearby the giver coordinates
     * @param GroupIndexRequestInterface 
     * @returns Group[]
     */
    async index({ latitude, longitude }: GroupIndexRequestInterface): Promise<Group[]> {

        if (!latitude || !longitude) {
            throw new Error("É obrigatórido enviar coordenadas para consultar os grupos próximos de você");
        }

        if (!this.validLatitude(latitude)) {
            throw new Error("A latitude deve ser um número válido");
        }

        if (!this.validLongitude(longitude)) {
            throw new Error("A longitude deve ser um número válido");
        }
        const groupRepository = getCustomRepository(GroupRepositories)

        const groups = await groupRepository.createQueryBuilder('groups')
            .where(
                `(groups.latitude between :latitude_min and :latitude_max) and (groups.longitude between :longitude_min and :longitude_max)`,
                { latitude_min: latitude - 0.05, latitude_max: latitude + 0.05, longitude_min: longitude - 0.06, longitude_max: longitude + 0.06 })
            .orderBy('id').getMany()

        return groups
    }

    /**
     * Create a new group
     * @param GroupRequestInterface 
     * @returns Group
     */
    async create({ name, latitude, longitude, invite_url, description }: GroupRequestInterface): Promise<Group> {

        this.validateGroupData({ name, latitude, longitude, invite_url, description })

        const groupRepository = getCustomRepository(GroupRepositories)

        const groupAlreadyExists = await groupRepository.findOne({ name })

        if (groupAlreadyExists) {
            throw new Error(`O grupo ${name} já existe. Crie um grupo com outro nome`);
        }

        const group = groupRepository.create({ name, latitude, longitude, invite_url, description })

        try {
            await groupRepository.save(group)
            return await groupRepository.findOne({ name: group.name })
        } catch (error) {
            console.log('error on creating group', error);
            throw new Error(`Ocorreu um erro ao criar um grupo`);
        }
    }

    /**
     * Return the especified group
     * @param id 
     * @returns Group
     */
    async show(id: any): Promise<Group> {

        const groupRepository = getCustomRepository(GroupRepositories)

        const group = await groupRepository.findOne(id)

        if (!group) {
            throw new Error(`groups ${id} not found`);
        }

        return group
    }

    /**
     * Update the especified group and return its updated data
     * @param UpdateGroupRequestInterface 
     * @returns Group
     */
    async update({ id, name, latitude, longitude, invite_url, description }: UpdateGroupRequestInterface): Promise<any> {

        this.validateGroupData({ name, latitude, longitude, invite_url, description })

        const groupRepository = getCustomRepository(GroupRepositories)

        const storedGroup = await groupRepository.findOne(id)
        const groupAlreadyExists = await groupRepository.findOne({ name })


        if (groupAlreadyExists && storedGroup.id !== groupAlreadyExists.id) {
            throw new Error(`O grupo ${name} já existe. Crie um grupo com outro nome`);
        }

        try {

            const result = await groupRepository.update(id, { name, latitude, longitude, invite_url, description })

            if (result.affected === 1) return {
                message: `Grupo ${id} atualizado com sucesso`,
                ...storedGroup, name, latitude, longitude, invite_url, description
            }

            throw new Error(`Erro ao atualizar o grupo ${id}`);

        } catch (error) {
            throw error
        }
    }

    /**
     * Delete a given group
     * @param id 
     * @returns object {message}
     */
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

    /**
     * Check and validate all input fields
     * @param GroupRequestInterface
     */
    protected validateGroupData({ name, latitude, longitude, invite_url, description }) {
        if (!name) {
            throw new Error("O campo nome deve estar presente");
        }

        if (!latitude) {
            throw new Error("O campo latitude deve estar presente");
        }

        if (!longitude) {
            throw new Error("O campo longitude deve estar presente");
        }

        if (!this.validLatitude(latitude)) {
            throw new Error("A latitude deve ser um número válido");
        }

        if (!this.validLongitude(longitude)) {
            throw new Error("A longitude deve ser um número válido");
        }

        if (!invite_url) {
            throw new Error("O campo link do convite deve estar presente");
        }

        if (!validUrl.isWebUri(invite_url)) {
            throw new Error("O campo link do convite deve ser um URL válido");
        }

        if (!this.isWhatsappUri(invite_url)) {
            throw new Error("O campo link do convite deve ser um link de um grupo do whatsapp válido");
        }

        if (!description) {
            throw new Error("o campo descrição deve estar presente");
        }
    }

    /**
     * Check if a string is a valid whastapp group URL
     * @param url 
     * @returns boolean
     */
    protected isWhatsappUri(url: string) {
        return validUrl.isWebUri(url) && (url.search(/http(s)?:\/\/chat.whatsapp.com\/[A-z1-9]+/) >= 0)
    }

    /**
     * Check if longitude is a valid value
     * @param lng 
     * @returns boolean
     */
    protected validLongitude(lng: number) {
        return !isNaN(lng) && (lng >= -180 && lng <= 180)
    }

    /**
     * Check if latitude is a valid value
     * @param lng 
     * @returns boolean
     */
    protected validLatitude(lat: number) {
        return !isNaN(lat) && (lat >= -90 && lat <= 90)
    }

}

export { GroupServices }