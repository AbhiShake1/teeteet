"use server"

import {prisma} from "@acme/db";

export interface PaginatedRequest {
    page?: number
    search?: string
    limit?: number
}

//TODO(AbhiShake1): Make all these infinite queries

export async function getRecommendedCars({page, search = '', limit = 12}: PaginatedRequest = {}) {
    console.log(page)
    return prisma.car.findMany({
        where: {
            model: {
                contains: search,
            },
            // OR: {
            //     manufacturer: {
            //         contains: search,
            //     }
            // }
        },
        skip: page ? (page * limit) - 1 : undefined,
        take: limit,
    })
}

export async function getTopSellingCars({page = 1, search = '', limit = 12}: PaginatedRequest = {}) {
    return prisma.car.findMany({
        where: {
            model: {
                contains: search,
            },
        },
        skip: page - 1,
        take: limit,
    })
}

export async function getPopularCars({page = 1, search = '', limit = 12}: PaginatedRequest = {}) {
    return prisma.car.findMany({
        where: {
            model: {
                contains: search,
            },
        },
        skip: page - 1,
        take: limit,
    })
}

export async function getLatestCars({page = 1, search = '', limit = 12}: PaginatedRequest = {}) {
    return prisma.car.findMany({
        where: {
            model: {
                contains: search,
            },
        },
        skip: page - 1,
        take: limit,
        orderBy: {
            createdOn: 'desc'
        }
    })
}
