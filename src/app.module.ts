import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { userSchema } from './users/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/nest-sample'), MongooseModule.forFeature([{name:'User',schema:userSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController)
  }
}