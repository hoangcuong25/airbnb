import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Public, ResponseMessage, Roles } from 'src/decorator/customize';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) { }

  @Roles("HOST")
  @ResponseMessage("Listing created successfully")
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createListingDto: CreateListingDto,
    @Req() req,
  ) {
    return this.listingService.create(createListingDto, images, req.user.id);
  }

  @Roles("HOST")
  @Get('get-my-listing')
  @ResponseMessage("My listings retrieved successfully")
  findMyListing(@Req() req) {
    return this.listingService.findMyListing(req.user.id);
  }

  @Get("get-all-listing")
  @ResponseMessage("Listing retrieved successfully")
  @Public()
  findAll() {
    return this.listingService.findAll();
  }

  @Patch('update')
  @ResponseMessage("Listing updated successfully")
  @Roles("ADMIN")
  @UseInterceptors(FilesInterceptor('images', 10))
  update(
    @Body() updateListingDto: UpdateListingDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.listingService.update(updateListingDto, images);
  }

  @Delete('delete/:id')
  @ResponseMessage("Listing deleted successfully")
  @Roles("ADMIN")
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }

  @Patch('host-update')
  @ResponseMessage("Listing updated successfully")
  @Roles("HOST")
  @UseInterceptors(FilesInterceptor('images', 10))
  hostUpdate(
    @Body() updateListingDto: UpdateListingDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req,
  ) {
    return this.listingService.hostUpdate(updateListingDto, images, req.user.id);
  }

  @Delete('host-delete/:id')
  @ResponseMessage("Listing deleted successfully")
  @Roles("HOST")
  hostRemove(@Param('id') id: string, @Req() req) {
    return this.listingService.hostRemove(+id, req.user.id);
  }
}
