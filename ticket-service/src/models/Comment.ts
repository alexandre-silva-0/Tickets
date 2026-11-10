import { Table, Column, BelongsTo, Model, ForeignKey, DataType, AllowNull, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Ticket } from "./Ticket.js";
import { User } from "./User.js";

@Table({
    tableName: "comment",
    timestamps: true
})

export class Comment extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare content: string

    @ForeignKey(() => Ticket)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ticketId!: number

    @BelongsTo(() => Ticket)
    ticket!: Ticket

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number

    @BelongsTo(() => User)
    user!: User
}