import { Test } from '@nestjs/testing';

import { RelationshipControllers } from './relationship.controller';

import type { TestingModule } from '@nestjs/testing';

describe('RelationshipController', () => {
    let controller: RelationshipControllers;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RelationshipControllers],
        }).compile();

        controller = module.get<RelationshipControllers>(
            RelationshipControllers,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
