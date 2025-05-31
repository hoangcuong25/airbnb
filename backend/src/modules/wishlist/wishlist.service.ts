import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
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
}
