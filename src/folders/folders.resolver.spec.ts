import { Test, TestingModule } from '@nestjs/testing';
import { FoldersResolver } from './folders.resolver';

describe('FoldersResolver', () => {
  let resolver: FoldersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoldersResolver],
    }).compile();

    resolver = module.get<FoldersResolver>(FoldersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
