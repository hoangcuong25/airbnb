import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {

  constructor(private prisma: PrismaService) { }

  addToWishlist(listingId: number, userId: number) {
    return this.prisma.wishlist.create({
      data: {
        userId,
        listingId,
      },
    });
  }

  async fetchUserWishlist(userId: number) {
    return this.prisma.wishlist.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async removeFromWishlist(listingId: number, userId: number) {
    return await this.prisma.wishlist.delete({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
    })
  }

}
