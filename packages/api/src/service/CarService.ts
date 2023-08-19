import {prisma} from "@acme/db";


//TODO(AbhiShake1): Make all these infinite queries
export class CarService {
    static getRecommended() {
        return prisma.car.findMany()
    }

    //TODO(AbhiShake1): Add top to redis and use that, or add sell count to psdb
    static getTopSelling() {
        return prisma.car.findMany()
    }

    //TODO(AbhiShake1): use redis and view count to get this
    static getPopular() {
        return prisma.car.findMany()
    }

    //TODO(AbhiShake1): Add createdOn to db
    static getLatest() {
        return prisma.car.findMany()
    }
}