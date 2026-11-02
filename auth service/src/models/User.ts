import { Table, Column, Model, HasMany, DataType, AllowNull, Unique, PrimaryKey, AutoIncrement, IsEmail } from 'sequelize-typescript'

@Table({
    tableName: 'user',
    timestamps: true
})
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
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

    @AllowNull(false)
    @Column(DataType.STRING)
    declare hashedPassword: string
}