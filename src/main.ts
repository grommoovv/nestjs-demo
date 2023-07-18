import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AuthGuard } from './auth/auth.guard'
import { ValidationPipe } from './pipes/validation.pipe'

const start = async () => {
  const PORT = process.env.PORT || 9090
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Тест Nest.JS Advanced')
    .setDescription('Документация RESTfull API')
    .setVersion('0.0.1')
    .addTag('Jorarri')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  // Доступ к приложению имеют только авторизованные пользователи
  // app.useGlobalGuards(AuthGuard)

  // // Глобальные валидаторы
  // app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`SERVER STARTED ON localhost:${PORT}`))
}

start()
