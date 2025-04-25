import { Provider } from 'src/common/enums/provider.enum';
import { Entity, BaseEntity, Column, BeforeInsert } from 'typeorm';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User extends BaseEntity {
  @Column()
  public userName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public password?: string;

  @Column({ type: 'text', array: true, nullable: true })
  public profileImg?: string[];

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  // 엔티티가 데이터베이스에 삽입되기 직전에 자동으로 데코레이트된 메서드 실행
  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    try {
      if (this.provider !== Provider.LOCAL) {
        return;
      } else {
        this.profileImg = [
          gravatar.url(this.email, {
            s: '200',
            r: 'pg',
            d: 'mm',
            protocol: 'https',
          }),
        ];

        if (this.password) {
          const saltValue = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, saltValue);
        }
      }
    } catch (error) {
      console.error('Error in beforeSaveFunction:', error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      if (!this.password) return false;
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
