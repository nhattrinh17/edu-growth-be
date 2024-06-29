import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Environment } from './constants';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      synchronize: process.env.APP_ID == Environment.Development,
      autoLoadModels: true,
      // logging: false,
      retry: {
        max: 5, // Số lần thử lại tối đa
      },
      // Lắng nghe sự kiện khi có lỗi kết nối
      dialectOptions: {
        connectTimeout: 8000, // Thời gian chờ kết nối (30 giây)
      },
      logging: (log) => {
        console.log(log); // Để theo dõi log kết nối trong quá trình phát triển
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
