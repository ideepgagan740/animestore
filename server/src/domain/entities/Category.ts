export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryEntity implements Category {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl?: string,
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateDetails(name?: string, description?: string, imageUrl?: string): void {
    if (name) this.name = name;
    if (description) this.description = description;
    if (imageUrl) this.imageUrl = imageUrl;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}