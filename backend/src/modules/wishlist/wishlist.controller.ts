import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @Post('add-to-wishlist')
  addToWishlist(
    @Body() body,
    @Req() req
  ) {
    return this.wishlistService.addToWishlist(body.listingId, req.user.id);
  }

  @Get('my-wishlist')
  getUserWishlist(@Req() req) {
    return this.wishlistService.fetchUserWishlist(req.user.id);
  }
}
