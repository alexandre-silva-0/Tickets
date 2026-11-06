import { Table, Column, Model, DataType, AllowNull, Unique, PrimaryKey, IsEmail } from 'sequelize-typescript'

@Table({
    tableName: 'user',
    timestamps: false
})
export class User extends Model {

    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Unique
    @IsEmail
    @Column(DataType.STRING)
    declare email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
    @Column(DataType.ENUM('agent', 'customer', 'admin'))
    declare role: 'agent' | 'customer' | 'admin'
}