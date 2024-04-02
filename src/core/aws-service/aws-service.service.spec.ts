import { Test, TestingModule } from '@nestjs/testing';
import { AwsServiceService } from './aws-service.service';

describe('AwsServiceService', () => {
  let service: AwsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsServiceService],
    }).compile();

    service = module.get<AwsServiceService>(AwsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
