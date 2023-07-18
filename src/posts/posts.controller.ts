import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CreatePostDto } from './dto/createPost.dto'
import { PostsService } from './posts.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: string) {
    return this.PostsService.create(dto, image)
  }
}
