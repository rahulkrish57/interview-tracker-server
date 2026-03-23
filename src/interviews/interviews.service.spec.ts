import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsService } from './interviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Interview, ModeOfWork, InterviewStatus } from './interviews.entity';
import { HistoryService } from '../history/history.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const mockHistoryService = {
  logCreated: jest.fn().mockResolvedValue({}),
  logStatusChange: jest.fn().mockResolvedValue({}),
};

describe('InterviewsService', () => {
  let service: InterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewsService,
        {
          provide: getRepositoryToken(Interview),
          useValue: mockRepository,
        },
        {
          provide: HistoryService,
          useValue: mockHistoryService,
        },
      ],
    }).compile();

    service = module.get<InterviewsService>(InterviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return interviews for a user', async () => {
      // Arrange
      const mockInterviews = [
        { id: '1', company: 'Google', user_id: 'user-123' },
        { id: '2', company: 'Amazon', user_id: 'user-123' },
      ];
      mockRepository.find.mockResolvedValue(mockInterviews);

      // Act
      const result = await service.findAll('user-123');

      // Assert
      expect(result).toEqual(mockInterviews);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { user_id: 'user-123' },
        order: { applied_date: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return an interview if found and user matches', async () => {
      // Arrange
      const mockInterview = {
        id: '1',
        company: 'Google',
        user_id: 'user-123',
      };
      mockRepository.findOne.mockResolvedValue(mockInterview);

      // Act
      const result = await service.findOne('1', 'user-123');

      // Assert
      expect(result).toEqual(mockInterview);
    });

    it('should throw NotFoundException if interview not found', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);

      // Act + Assert
      await expect(service.findOne('999', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user does not own interview', async () => {
      // Arrange
      const mockInterview = {
        id: '1',
        company: 'Google',
        user_id: 'other-user',
      };
      mockRepository.findOne.mockResolvedValue(mockInterview);

      // Act + Assert
      await expect(service.findOne('1', 'user-123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('create', () => {
    it('should create and return an interview', async () => {
      // Arrange
      const dto: CreateInterviewDto = {
        company: 'Google',
        location: 'Bengaluru',
        mode_of_work: ModeOfWork.ONSITE,
        status: InterviewStatus.PHONE,
        applied_date: '2026-01-01',
      };
      const mockInterview = { id: '1', ...dto, user_id: 'user-123' };

      mockRepository.create.mockReturnValue(mockInterview);
      mockRepository.save.mockResolvedValue(mockInterview);

      // Act
      const result = await service.create(dto, 'user-123');

      // Assert
      expect(result).toEqual(mockInterview);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...dto,
        user_id: 'user-123',
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockInterview);
      expect(mockHistoryService.logCreated).toHaveBeenCalledWith(
        mockInterview.id,
        mockInterview.company,
      );
    });
  });

  describe('remove', () => {
    it('should remove an interview and return a message', async () => {
      // Arrange
      const mockInterview = {
        id: '1',
        company: 'Google',
        user_id: 'user-123',
      };
      mockRepository.findOne.mockResolvedValue(mockInterview);
      mockRepository.remove.mockResolvedValue(mockInterview);

      // Act
      const result = await service.remove('1', 'user-123');

      // Assert
      expect(result).toEqual({ message: 'Interview at Google deleted' });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockInterview);
    });
  });
});
