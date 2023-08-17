import {faker} from '@faker-js/faker'
import {prisma} from '@acme/db'

function seedCars() {
    prisma.car.createMany({
        data: Array(30).map(() => ({
            // color: faker.color.human(),
            color: faker.vehicle.color(),
            mileage: faker.number.int({min: 18, max: 150}),
            price: faker.number.int({min: 30000, max: 120000}),
            model: faker.vehicle.model(),
            manufacturer: faker.vehicle.manufacturer(),
            year: faker.number.int({min: 1930, max: 2050}),
            imageUrl: faker.image.transport(undefined, undefined, true),
        }))
    })
}

export default seedCars
