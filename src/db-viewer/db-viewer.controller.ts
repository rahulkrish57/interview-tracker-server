/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('api/db-viewer')
export class DbViewerController {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Get()
  async getDbInfo() {
    // Get all tables in public schema
    const tables = await this.dataSource.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    const result: any[] = [];

    for (const { table_name } of tables) {
      // Get columns for each table
      const columns = await this.dataSource.query(
        `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `,
        [table_name],
      );

      // Get row count
      const [{ count }] = await this.dataSource.query(`
        SELECT COUNT(*) as count FROM "${table_name}"
      `);

      // Get actual rows (limit 100)
      const rows = await this.dataSource.query(`
        SELECT * FROM "${table_name}"
        LIMIT 100
      `);

      result.push({ table_name, columns, row_count: count, rows });
    }

    return result;
  }
}
