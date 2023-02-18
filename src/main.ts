import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
// import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  // app.use(
  //   graphqlUploadExpress({
  //     maxFieldSize: 1000000,
  //     maxFiles: 10,
  //   }),
  // );

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(3000);
}
bootstrap();
