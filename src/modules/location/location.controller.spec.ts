import { Test } from '@nestjs/testing';

import { LocationController } from './location.controller';

import type { TestingModule } from '@nestjs/testing';

describe('LocationController', () => {
      let controller: LocationController;

      beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                  controllers: [LocationController],
            }).compile();

            controller = module.get<LocationController>(LocationController);
      });

      it('should be defined', () => {
            expect(controller).toBeDefined();
      });
});
