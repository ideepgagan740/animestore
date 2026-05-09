export interface Anime {
  id: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: Date;
  episodes: number;
  rating: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class AnimeEntity implements Anime {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public genre: string[],
    public releaseDate: Date,
    public episodes: number,
    public rating: number,
    public imageUrl: string,
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateDetails(
    title?: string,
    description?: string,
    genre?: string[],
    episodes?: number,
    rating?: number,
    imageUrl?: string,
  ): void {
    if (title) this.title = title;
    if (description) this.description = description;
    if (genre) this.genre = genre;
    if (episodes) this.episodes = episodes;
    if (rating) this.rating = rating;
    if (imageUrl) this.imageUrl = imageUrl;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}