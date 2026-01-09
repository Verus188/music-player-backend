export interface MusicProvider {
  searchTracks(query: string): Promise<any>;
  getTrack(trackId: string): Promise<any>;
}
