import { Request, Response } from 'express'
import { GroupServices } from '../services/GroupServices';

class GroupController {

    async index(request: Request, response: Response) {

        let latitude: number = Number(request.query.latitude)
        let longitude: number = Number(request.query.longitude)

        const groupService = new GroupServices()

        let responseData = await groupService.index({ latitude, longitude })
            .then(res => responseData = response.json(res))
            .catch(err => responseData = response.status(400).json({ message: err.message }))

        return responseData
    }


    async create(request: Request, response: Response) {

        const { name, latitude, longitude, invite_url, description } = request.body

        const groupService = new GroupServices()

        let responseData = await groupService.create({ name, latitude, longitude, invite_url, description })
            .then(res => responseData = response.status(201).json(res))
            .catch(err => responseData = response.status(400).json({ message: err.message }))

        return responseData
    }

    async show(request: Request, response: Response) {

        const { id } = request.params

        const groupService = new GroupServices()

        let responseData = await groupService.show(id)
            .then(res => responseData = response.json(res))
            .catch(err => responseData = response.status(400).json({ message: err.message }))

        return responseData
    }

    async update(request: Request, response: Response) {

        const { id } = request.params
        const { name, latitude, longitude, invite_url, description } = request.body

        const groupService = new GroupServices()

        let responseData = await groupService.update({ id, name, latitude, longitude, invite_url, description })
            .then(res => responseData = response.status(200).json(res))
            .catch(err => responseData = response.status(400).json({ message: err.message }))

        return responseData
    }

    async destroy(request: Request, response: Response) {

        const { id } = request.params

        const groupService = new GroupServices()

        let responseData = await groupService.delete(id)
            .then(res => responseData = response.json(res))
            .catch(err => responseData = response.status(400).json({ message: err.message }))

        return responseData
    }
}

export { GroupController }