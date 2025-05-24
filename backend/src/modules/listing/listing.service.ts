import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ListingService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) { }

  async create(createListingDto: CreateListingDto, images: Express.Multer.File[], hostId: number) {
    if (!images || images.length === 0) {
      throw new BadRequestException('No images provided');
    }

    // Bước 1: Tạo listing
    const listing = await this.prisma.listing.create({
      data: {
        title: createListingDto.title,
        description: createListingDto.description,
        pricePerNight: createListingDto.pricePerNight,
        address: createListingDto.address,
        city: createListingDto.city,
        country: createListingDto.country,
        hostId: hostId,
      }
    })

    // Bước 2: Upload ảnh lên Cloudinary
    const imageUploadResults = await Promise.all(
      images.map((file) => {
        return this.cloudinary.uploadFile(file);
      })
    )
    const imageUrls = imageUploadResults.map((result) => result.url);

    // Bước 3: Lưu URL ảnh vào bảng listingImage
    await this.prisma.listingImage.createMany({
      data: imageUrls.map((url) => ({
        listingId: listing.id,
        url,
      })),
    });

    return 'Listing created successfully'
  }

  findAll() {
    return this.prisma.listing.findMany({
      include: {
        host: true,
        images: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  async remove(id: number) {
    // 1. Kiểm tra xem listing tồn tại không
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!listing) {
      throw new BadRequestException('Listing not found');
    }

    // 2.  Xoá ảnh khỏi Cloudinary
    for (const image of listing.images) {
      const publicId = this.cloudinary.extractPublicId(image.url);
      await this.cloudinary.deleteFile(publicId);
    }

    // 3. Xoá ảnh trong bảng listingImage
    await this.prisma.listingImage.deleteMany({
      where: { listingId: id },
    });

    // 4. Xoá listing
    await this.prisma.listing.delete({
      where: { id },
    });

    return 'Listing deleted successfully';
  }
}
