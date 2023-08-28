import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TASK_STATUS } from "../enums";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: TASK_STATUS, default: TASK_STATUS.TODO })
  status: boolean;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
