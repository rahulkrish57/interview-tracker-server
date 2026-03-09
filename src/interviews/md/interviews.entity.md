### Understand what each decorator does:

@Entity('interviews')     → maps this class to the "interviews" table

@PrimaryGeneratedColumn('uuid') → auto-generates a unique ID
                                  e.g. "a3f2c1d0-..."

@Column()                 → a required column

@Column({ nullable: true }) → optional column, can be empty

@Column({ type: 'enum' }) → restricts values to your enum only

@CreateDateColumn()       → auto-sets when row is created
@UpdateDateColumn()       → auto-updates when row is modified