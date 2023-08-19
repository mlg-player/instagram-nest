import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipControllers } from './relationship.controller';
import { RelationshipEntity } from './relationship.entity';
import { RelationshipService } from './relationship.service';

@Module({
    imports: [TypeOrmModule.forFeature([RelationshipEntity])],
    controllers: [RelationshipControllers],
    providers: [RelationshipService],
    exports: [RelationshipService],
})
export class RelationshipModule {}
