import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreResult } from 'entities/core-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoreResultService {
  constructor(
    @InjectRepository(CoreResult) private coreResult: Repository<CoreResult>,
  ) {}

  async findAll(): Promise<CoreResult[]> {
    const results = await this.coreResult.find();
    return results;
  }

  async findOne(id: number): Promise<CoreResult> {
    const result = await this.coreResult.findOne(id);
    return result;
  }

  async findResultsWithWebsite() {
    const result = await this.coreResult.find({
      relations: ['website'],
    });

    return result;
  }

  async create(coreResult: CoreResult) {
    const exists = await this.coreResult.findOne({
      where: {
        website: {
          id: coreResult.website.id,
        },
      },
    });

    if (exists) {
      // then update
      await this.coreResult.save({
        ...exists,
        ...coreResult,
      });
    } else {
      await this.coreResult.save(coreResult);
    }
  }
}
