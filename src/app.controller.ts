import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/item')
  getList() {
    return this.appService.getList();
  }

  @Get('/item/:id')
  getItemById(@Param('id') id: number) {
    return this.appService.getItemById(id);
  }

  @Post('/item')
  createItem(@Body() item: Record<string, any>) {
    return this.appService.createItem(item);
  }
}
