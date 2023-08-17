import seedCars from "./core/faker/CarDataFaker";
import {prisma} from "@acme/db";
import {faker} from "@faker-js/faker";

// seedCars()

for (const _ of Array(30)) {
    prisma.car.create({
        data: {
            color: faker.vehicle.color(),
            mileage: faker.number.int({min: 18, max: 150}),
            price: faker.number.int({min: 30000, max: 120000}),
            model: faker.vehicle.model(),
            manufacturer: faker.vehicle.manufacturer(),
            year: faker.number.int({min: 1930, max: 2050}),
            imageUrl: faker.image.urlLoremFlickr({category: 'transport'}),
        }
    }).then(()=>console.log('car added'))
}
console.log('Seeded cars')