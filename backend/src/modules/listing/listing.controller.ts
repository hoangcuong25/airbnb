import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ResponseMessage, Roles } from 'src/decorator/customize';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) { }

  @Roles("ADMIN")
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

  @Get("get-all-listing")
  @ResponseMessage("Listing retrieved successfully")
  @Roles("ADMIN")
  findAll() {
    return this.listingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(+id, updateListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }
}
