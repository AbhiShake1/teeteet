"use server"

import {prisma} from "@acme/db";

export interface PaginatedRequest {
    page?: number
    search?: string
}

//TODO(AbhiShake1): Make all these infinite queries

export async function getRecommendedCars({page = 1, search = ''}: PaginatedRequest = {}) {
    return prisma.car.findMany({
        where: {
            model: {
                contains: search,
            },
            OR: {
                manufacturer: {
                    contains: search,
                }
            }
        },
        skip: page - 1,
        take: 15,
    })
}

export async function getTopSellingCars({page = 1, search = ''}: PaginatedRequest = {}) {
    return prisma.car.findMany()
}

export async function getPopularCars({page = 1, search = ''}: PaginatedRequest = {}) {
    return prisma.car.findMany()
}

export async function getLatestCars({page = 1, search = ''}: PaginatedRequest = {}) {
    return prisma.car.findMany({
        orderBy: {
            createdOn: 'desc'
        }
    })
}
