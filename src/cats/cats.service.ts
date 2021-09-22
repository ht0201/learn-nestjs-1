import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(cat: Cat): Promise<Cat> {
    const createdCat = new this.catModel(cat);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findOne({ _id: id });
  }

  async update(id: string, cat: Cat): Promise<Cat> {
    return await this.catModel.findByIdAndUpdate(id, cat, {
      new: true,
    });
  }

  async delete(id: string): Promise<Cat> {
    return await this.catModel.findByIdAndRemove(id);
  }
}
