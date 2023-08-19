import {prisma} from "@acme/db";

export class CarService {
    static getRecommended() {
        return prisma.car.findMany()
    }
}