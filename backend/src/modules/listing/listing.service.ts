import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

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
    });

    // Bước 2: Upload ảnh lên Cloudinary và lưu thông tin chi tiết
    const newImageRecords = [];

    for (const file of images) {
      try {
        const uploadResult = await this.cloudinary.uploadFile(file);
        newImageRecords.push({
          listingId: listing.id,
          url: uploadResult.secure_url,
          name: uploadResult.original_filename,
        });
      } catch (err) {
        console.error("Image upload failed:", file.originalname, err);
        // Bạn có thể throw lỗi ở đây hoặc tiếp tục bỏ qua ảnh lỗi tùy use-case
      }
    }

    // Bước 3: Lưu ảnh mới vào bảng
    if (newImageRecords.length > 0) {
      await this.prisma.listingImage.createMany({
        data: newImageRecords,
      });
    }

    return { message: "Listing created successfully" };
  }

  findAll() {
    return this.prisma.listing.findMany({
      include: {
        host: true,
        images: true,
      }
    });
  }

  async update(updateListingDto: UpdateListingDto, images: Express.Multer.File[]) {
    const { id, removedImageIds, ...updateData } = updateListingDto;

    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!listing) throw new NotFoundException("Listing not found");

    // 1. Xóa ảnh cũ
    if (removedImageIds) {
      const ids = Array.isArray(removedImageIds)
        ? removedImageIds
        : [removedImageIds];

      const imagesToRemove = listing.images.filter((img) =>
        ids.includes(img.id),
      );

      // xóa trên Cloudinary
      for (const img of imagesToRemove) {
        const publicId = this.cloudinary.extractPublicId(img.url);
        if (publicId) {
          await this.cloudinary.deleteFile(publicId);
        }
      }

      await this.prisma.listingImage.deleteMany({
        where: {
          id: { in: ids },
          listingId: id,
        },
      });
    }

    // 2. Upload ảnh mới lên Cloudinary
    const newImageRecords = [];

    for (const file of images) {
      const uploadResult = await this.cloudinary.uploadFile(file);

      newImageRecords.push({
        listingId: id,
        url: uploadResult.secure_url,
        name: uploadResult.original_filename,
      });
    }

    if (newImageRecords.length > 0) {
      await this.prisma.listingImage.createMany({
        data: newImageRecords,
      });
    }

    // 3. Cập nhật các trường khác
    await this.prisma.listing.update({
      where: { id },
      data: updateData,
    });

    return { message: "Listing updated successfully" };
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

  async findMyListing(hostId: number) {
    const listings = await this.prisma.listing.findMany({
      where: { hostId },
      include: {
        images: true,
      },
    });

    if (!listings || listings.length === 0) {
      throw new NotFoundException("No listings found for this host");
    }

    return listings;
  }
}
