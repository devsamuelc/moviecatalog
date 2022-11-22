import {
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { MovieGenres } from '../enum/movie-genre.enum';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'poster', nullable: true })
  poster: string;

  @Column({
    type: 'enum',
    enum: MovieGenres,
    name: 'main_genre',
    nullable: false,
  })
  mainGenre: MovieGenres;

  @Column({
    type: 'enum',
    enum: MovieGenres,
    name: 'secondary_genre',
    nullable: true,
  })
  secondaryGenre: MovieGenres;

  @Column({ name: 'release_year', nullable: true })
  releaseYear: string;

  @Column({ name: 'director', nullable: true })
  director: string;

  @ManyToOne(() => User, (uploadedBy: User) => uploadedBy.movies)
  @Column({ name: 'uploaded_by', nullable: false })
  uploadedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(movie?: Partial<Movie>) {
    this.id = movie?.id;
    this.title = movie?.title;
    this.description = movie?.description;
    this.mainGenre = movie?.mainGenre;
    this.secondaryGenre = movie?.secondaryGenre;
    this.releaseYear = movie?.releaseYear;
    this.director = movie?.director;
    this.uploadedBy = movie?.uploadedBy;
    this.createdAt = movie?.createdAt;
    this.updatedAt = movie?.updatedAt;
    this.deletedAt = movie?.deletedAt;
  }
}
