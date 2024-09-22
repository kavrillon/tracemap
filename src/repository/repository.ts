export type Repository<T> = {
  getAll(): Promise<T[]>;
  save(item: T): Promise<void>;
  saveAll(items: T[]): Promise<void>;
};
