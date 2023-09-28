"use server"

import {prisma} from "@acme/db";
import {cache} from 'react'
// TODO(AbhiShake1): Update imports once next cache is stable
// import {unstable_cache as cache} from 'next/cache'

export interface PaginatedRequest {
    page?: number
    search?: string
    limit?: number
}

export const getRecommendedCars = cache(
    async ({page = 0, search = '', limit = 12}: PaginatedRequest = {}) => {
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
            skip: page * limit,
            take: limit,
        })
    }
)

export const getTopSellingCars = cache(
    async ({page = 0, search = '', limit = 12}: PaginatedRequest = {}) => {
        return prisma.car.findMany({
            where: {
                model: {
                    contains: search,
                },
            },
            skip: page * limit,
            take: limit,
        })
    }
)

export const getPopularCars = cache(
    async ({page = 0, search = '', limit = 12}: PaginatedRequest = {}) => {
        return prisma.car.findMany({
            where: {
                model: {
                    contains: search,
                },
            },
            skip: page * limit,
            take: limit,
        })
    }
)

export const getLatestCars = cache(
    async ({page = 0, search = '', limit = 12}: PaginatedRequest = {}) => {
        return prisma.car.findMany({
            where: {
                model: {
                    contains: search,
                },
            },
            skip: page * limit,
            take: limit,
            orderBy: {
                createdOn: 'desc'
            }
        })
    }
)

export const getCarDetail = cache(
    async (id: string) => prisma.car.findUniqueOrThrow({where: {id}})
)
