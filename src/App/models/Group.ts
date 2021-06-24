import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("groups")
export class Group {
    @PrimaryColumn()
    readonly id: Number;

    @Column()
    name: string;

    @Column()
    latitude: Number;

    @Column()
    longitude: Number;

    @Column()
    invite_url: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
