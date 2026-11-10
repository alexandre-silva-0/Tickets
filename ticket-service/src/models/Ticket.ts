import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User.js";

@Table({
    tableName: 'ticket',
    timestamps: true
})

export class Ticket extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare title: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare description: string

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('open', 'in_progress', 'resolved', 'closed'),
        defaultValue: 'open'
    })
    declare status: 'open' | 'in_progress' | 'resolved' | 'closed'

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number

    @BelongsTo(() => User)
    user!: User
}