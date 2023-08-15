import { Test } from '@nestjs/testing';

import { LikeController } from './like.controller';

import type { TestingModule } from '@nestjs/testing';

describe('LikeController', () => {
      let controller: LikeController;

      beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                  controllers: [LikeController],
            }).compile();

            controller = module.get<LikeController>(LikeController);
      });

      it('should be defined', () => {
            expect(controller).toBeDefined();
      });
});
