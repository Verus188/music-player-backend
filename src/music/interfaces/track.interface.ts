import { Track } from '@prisma/client';

export type ApiTrack = Omit<
  Track,
  'id' | 'createdAt' | 'fileUrl' | 'albumImageUrl'
>;
