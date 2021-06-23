import { EntityRepository, Repository } from "typeorm";
import { Group } from "../models/Group";


@EntityRepository(Group)
export default class GroupRepositories extends Repository<Group>{

}