import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/createPost.dto'
import { InjectModel } from '@nestjs/sequelize'
import { PostsModel } from './posts.model'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel) private PostsRepository: typeof PostsModel,
    private FilesService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: string) {
    const fileName = await this.FilesService.createFile(image)
    const post = await this.PostsRepository.create({ ...dto, image: fileName })
    return post
  }
}
